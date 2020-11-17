const Game = require('./game.js');

class GameServer {
    constructor(io) {
        this._io = io;
        this._io.on('connection', socket => this._onClientConnect(this, socket));

        this._gameLookup = new Map();
    }

    _onClientConnect(self, socket) {
        socket.on('disconnect', reason => self._onClientDisconnect(socket, reason));
        socket.on('game-create', (config, callback) => callback(self._onClientNewGameRequest(socket, config)));
        socket.on('game-end', callback => callback(self._onClientGameEnd(socket)));
        socket.on('game-join', (gameId, callback) => callback(self._onClientGameJoinRequest(socket, gameId)));
        socket.on('game-take-turn', (cellId, callback) => callback(self._onClientGameTakeTurn(socket, cellId)));
    }

    _onClientDisconnect(socket, reason) {
        // TODO: handle terminating games for player
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

        return {
            success: true,
            game: newGame.toPublicObject()
        };
    }

    _onClientGameEnd(socket) {
        const playerId = socket.id;

        // Find the player's game
        const game = this._getPlayersGame(playerId);
        if (!game) {
            return this._createFailureResponse('Player is not in a game.');
        }

        this._cleanupGame(game);

        // Remove the socket from the game room
        socket.leave(game.id);

        // Broadcast to the remaining client's in the room that the game has been terminated
        // due to a client leaving.
        this._io.in(game.id).emit('game-end', {
            reason: 'client-requested'
        });

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

        return {
            success: true,
            game: game.toPublicObject()
        };
    }

    _onClientGameTakeTurn(socket, cellId) {
        // TODO: argument defense

        const playerId = socket.id;

        // Find the player's game
        const game = this._getPlayersGame(playerId);
        if (!game) {
            return this._createFailureResponse('Player is not in a game.');
        }

        // Take the turn
        const turnSuccessful = game.takeTurn(playerId, cellId);
        if (turnSuccessful) {
            // Check if anyone has won the game
            const won = game.whoWon();
            if (won) {
                if (won === 'draw') {
                    this._io.in(game.id).emit('game-end', {
                        reason: 'client-draw'
                    });
                } else {
                    this._io.in(game.id).emit('game-end', {
                        reason: 'client-won',
                        player: won
                    });
                }

                this._cleanupGame(game);
            }

            this._broadcastGameToRoom(game);

            return this._createSuccessResponse();
        } else {
            return this._createFailureResponse('Player cannot take turn.');
        }
    }

    _cleanupGame(game) {
        this._gameLookup.delete(game.id);

        // TODO: handle socket cleanup
        // const sockets = this._io.sockets.adapter.rooms[game.id].sockets;
        // for (const socket in sockets) {
            
        // }
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
        this._io.in(game.id).emit('game-update', game.toPublicObject());
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