const Game = require('./game.js');

class GameServer {
    constructor(io) {
        this._io = io;
        this._io.on('connection', socket => this._onClientConnect(this, socket));

        this._gameLookup = new Map();
    }

    _onClientConnect(self, socket) {
        socket.on('create_game', (config, callback) => callback(self._onClientNewGameRequest(socket, config)));
        socket.on('join_game', (gameId, callback) => callback(self._onClientGameJoinRequest(socket, gameId)));
        socket.on('disconnect', reason => self._onClientDisconnect(socket, reason));
    }

    _onClientDisconnect(socket, reason) {
        // TODO: handle terminating in-progress games for player
    }

    _onClientNewGameRequest(socket, config) {
        // TODO: argument defense

        const playerId = socket.id;

        // Check if player is already in a game
        if (this._isPlayerInGame(playerId)) {
            return this._createFailureResponse('Player already in a game.');
        }

        // Create a new game using the configuration from the client.
        const newGame = new Game(config);
        newGame.addPlayer(playerId);

        this._gameLookup.set(newGame.id, newGame);

        // Add the socket to the game's room
        socket.join(newGame.id);

        return {
            success: true,
            game: newGame
        };
    }

    _onClientGameJoinRequest(socket, gameId) {
        // Check if given game ID is a 5-digit string
        if (!(/^\d{5}$/).test(gameId)) {
            return this._createFailureResponse('Invalid game ID.');
        }

        // Check if player is already in a game
        const playerId = socket.id;
        if (this._isPlayerInGame(playerId)) {
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

        return {
            success: true,
            game: game
        };
    }

    _isPlayerInGame(playerId) {
        for (const game of this._gameLookup.values()) {
            if (game.nought === playerId || game.cross === playerId) {
                return true;
            }
        }

        return false;
    }

    _createFailureResponse(message) {
        return {
            success: false,
            message: message
        }
    }
}

module.exports = GameServer;