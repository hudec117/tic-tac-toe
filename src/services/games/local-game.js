const Game = require('./game.js');

class LocalGame extends Game {
    constructor(config) {
        super(config);

        this._player = '';
    }

    addPlayer(playerId) {
        if (this._player !== '') {
            return false;
        }

        this._player = playerId;
        this.state = 'playing';
        this.turn = this.SUPPORTED_PIECES[0];

        return true;
    }

    hasPlayer(playerId) {
        return this._player === playerId;
    }

    takeTurn(playerId, cellId) {
        const canTakeTurn = this.state === 'playing' && playerId === this._player;
        if (!canTakeTurn) {
            return false;
        }

        return true;
    }

    toPublicObject() {
        return {
            id: this.id,
            type: this.type,
            state: this.state,
            players: [this._player],
            turn: this.turn,
            board: this.board.toPublicObject()
        };
    }
}

module.exports = LocalGame;