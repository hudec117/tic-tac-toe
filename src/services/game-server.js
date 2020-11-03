class GameServer {
    constructor(io) {
        this._io = io;
        this._io.on('connection', this._onClientConnect);
    }

    _onClientConnect(socket) {
        socket.on('create_game', this._onClientNewGameRequest);
        socket.on('join_game', this._onClientGameJoinRequest);
    }

    _onClientNewGameRequest() {

    }

    _onClientGameJoinRequest() {

    }
}

module.exports = GameServer;