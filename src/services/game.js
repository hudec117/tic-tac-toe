const GameBoardGenerator = require('./game-board-generator.js');
const Random = require('random-js').Random;

const SUPPORTED_PIECES = ['X', 'O'];

class Game {
    constructor(config) {
        this.id = this._generateGameId();
        this.availablePieces = SUPPORTED_PIECES;
        this.players = {};
        this.turn = this._generateRandomPiece();

        const boardGenerator = new GameBoardGenerator(config);
        this.board = boardGenerator.generate();
    }

    _generateGameId() {
        const random = new Random();
        return random.integer(10000, 99999).toString();
    }

    _generateRandomPiece() {
        const random = new Random();
        return this.availablePieces[random.integer(0, this.availablePieces.length - 1)];
    }

    addPlayer(id) {
        if (this.availablePieces.length === 0 || id in this.players) {
            return false;
        }

        const nextPiece = this._generateRandomPiece();

        this.players[id] = nextPiece;

        this.availablePieces = this.availablePieces.filter(piece => piece !== nextPiece);

        return true;
    }
}

module.exports = Game;