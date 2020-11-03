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
    }

    _onClientNewGameRequest(socket, config) {
        // TODO: argument defenses

        // Create a new game using the configuration from the client.
        const newGame = new Game(config);
        newGame.addPlayer(socket.id);

        this._gameLookup.set(newGame.id, newGame);

        // Add the socket to the game's room
        socket.join(newGame.id);

        return {
            success: true,
            game: newGame
        };
    }

    _onClientGameJoinRequest(socket, gameId) {
        // TODO: argument defenses

        // Lookup the game
        const game = this._gameLookup.get(gameId);
        if (game === undefined) {
            return {
                success: false,
                message: 'Game does not exist.'
            };
        }

        // Attempt to add the player to the game
        if (!game.addPlayer(socket.id)) {
            return {
                success: false,
                message: 'Game is full.'
            };
        }

        // Add the socket to the game's room
        socket.join(game.id);

        return {
            success: true,
            game: game
        };
    }
}

module.exports = GameServer;