const Game = require('./game.js');

class GameServer {
    constructor(io) {
        this._io = io;
        this._io.on('connection', socket => this._onClientConnect(this, socket));

        this._gameLookup = new Map();
    }

    _onClientConnect(self, socket) {
        socket.on('disconnect', reason => self._onClientDisconnect(socket, reason));
        socket.on('create_game', (config, callback) => callback(self._onClientNewGameRequest(socket, config)));
        socket.on('join_game', (gameId, callback) => callback(self._onClientGameJoinRequest(socket, gameId)));
        socket.on('take_turn', (cellId, callback) => callback(self._onClientGameTakeTurn(socket, cellId)));
    }

    _onClientDisconnect(socket, reason) {
        // TODO: handle terminating in-progress games for player
    }

    _onClientNewGameRequest(socket, config) {
        // TODO: argument defense

        const playerId = socket.id;

        // Check if player is already in a game
        if (this._getPlayersGame(playerId)) {
            return this._createFailureResponse('Player already in a game.');
        }

        // Create a new game using the configuration from the client.
        const newGame = new Game(config);
        newGame.addPlayer(playerId);

        this._gameLookup.set(newGame.id, newGame);

        // Add the socket to the game's room.
        socket.join(newGame.id);

        // Update game for client.
        this._broadcastGameToRoom(newGame);

        return this._createSuccessResponse();
    }

    _onClientGameJoinRequest(socket, gameId) {
        // Check if given game ID is a 5-digit string
        if (!(/^\d{5}$/).test(gameId)) {
            return this._createFailureResponse('Invalid game ID.');
        }

        // Check if player is already in a game
        const playerId = socket.id;
        if (this._getPlayersGame(playerId)) {
            return this._createFailureResponse('Player already in a game.');
        }

        // Lookup the game
        const game = this._gameLookup.get(gameId);
        if (game === undefined) {
            return this._createFailureResponse('Game does not exist.');
        }

        // Attempt to add the player to the game
        if (!game.addPlayer(playerId)) {
            return this._createFailureResponse('Game is full.');
        }

        // Add the socket to the game's room
        socket.join(game.id);

        // Broadcast the game to everyone in the room.
        this._broadcastGameToRoom(game);

        return this._createSuccessResponse();
    }

    _onClientGameTakeTurn(socket, cellId) {
        // TODO: argument defense

        const playerId = socket.id;

        // Find the player's game
        const game = this._getPlayersGame(playerId);
        if (!game) {
            return this._createFailureResponse('Player is not in a game.');
        }

        if (game.takeTurn(playerId, cellId)) {
            this._broadcastGameToRoom(game);
            return this._createSuccessResponse();
        } else {
            return this._createFailureResponse('Player cannot take turn.');
        }
    }

    _getPlayersGame(playerId) {
        for (const game of this._gameLookup.values()) {
            if (game.hasPlayer(playerId)) {
                return game;
            }
        }

        return null;
    }

    _broadcastGameToRoom(game) {
        this._io.in(game.id).emit('update_game', game.toPublicObject());
    }

    _createSuccessResponse() {
        return {
            success: true
        };
    }

    _createFailureResponse(message) {
        return {
            success: false,
            message: message
        }
    }
}

module.exports = GameServer;