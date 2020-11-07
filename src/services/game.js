const GameBoard = require('./game-board.js');
const Random = require('random-js').Random;

const SUPPORTED_PIECES = ['X', 'O'];

class Game {
    constructor(config) {
        this.id = this._generateGameId();
        this.availablePieces = SUPPORTED_PIECES;
        this.players = {};
        this.turn = this._generateRandomPiece();

        this.board = new GameBoard(config);
    }

    _generateGameId() {
        const random = new Random();
        return random.integer(10000, 99999).toString();
    }

    _generateRandomPiece() {
        const random = new Random();
        return this.availablePieces[random.integer(0, this.availablePieces.length - 1)];
    }

    addPlayer(playerId) {
        if (this.availablePieces.length === 0 || this.hasPlayer(playerId)) {
            return false;
        }

        const nextPiece = this._generateRandomPiece();

        this.players[playerId] = nextPiece;

        this.availablePieces = this.availablePieces.filter(piece => piece !== nextPiece);

        return true;
    }

    hasPlayer(playerId) {
        return playerId in this.players;
    }

    takeTurn(playerId, cellId) {
        const playerPiece = this.players[playerId];
        if (playerPiece !== this.turn) {
            return false;
        }

        const cell = this.board.getCell(cellId);

        cell.type = this.turn;

        if (this.turn === 'X') {
            this.turn = 'O';
        } else {
            this.turn = 'X';
        }

        return true;
    }

    toPublicObject() {
        return {
            id: this.id,
            players: this.players,
            turn: this.turn,
            board: this.board.toPublicObject()
        };
    }
}

module.exports = Game;