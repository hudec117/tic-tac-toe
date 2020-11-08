const GameBoard = require('./game-board.js');

const Random = require('random-js').Random;
const shuffle = require('shuffle-array');

const SUPPORTED_PIECES = ['X', 'O'];

class Game {
    constructor(config) {
        this.id = this._generateGameId();
        this.state = 'waiting';
        this.turn = '';
        this.board = new GameBoard(config);

        this._availablePieces = shuffle(SUPPORTED_PIECES, { copy: true });
        this._playerPieceLookup = new Map();
        this._playerOrder = [];
    }

    _generateGameId() {
        const random = new Random();
        return random.integer(10000, 99999).toString();
    }

    addPlayer(playerId) {
        const canAddPlayer = this.state === 'waiting'
                          && this._availablePieces.length > 0
                          && !this.hasPlayer(playerId);
        if (!canAddPlayer) {
            return false;
        }

        const nextPiece = this._availablePieces.shift();

        // Add player to lookup and order.
        this._playerPieceLookup.set(playerId, nextPiece);
        this._playerOrder.push(playerId);

        // Remove piece from available pieces
        this._availablePieces = this._availablePieces.filter(piece => piece !== nextPiece);

        // Set the game state to playing once all the players have joined
        if (this._availablePieces.length === 0) {
            this.state = 'playing';
            this.turn = this._playerOrder[0];
        }

        return true;
    }

    hasPlayer(playerId) {
        return this._playerPieceLookup.has(playerId);
    }

    takeTurn(playerId, cellId) {
        const canTakeTurn = this.state === 'playing'
                         && this.turn === playerId;
        if (!canTakeTurn) {
            return false;
        }

        // Update the cell type to the player's piece
        const cell = this.board.getCell(cellId);
        cell.type = this._playerPieceLookup.get(playerId);

        // Rotate the turn
        const nextPlayer = this._playerOrder.shift();
        this.turn = this._playerOrder[0];
        this._playerOrder.push(nextPlayer);

        return true;
    }

    toPublicObject() {
        return {
            id: this.id,
            state: this.state,
            players: Object.fromEntries(this._playerPieceLookup),
            turn: this.turn,
            board: this.board.toPublicObject()
        };
    }
}

module.exports = Game;