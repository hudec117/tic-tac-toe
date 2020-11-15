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

        // Update the cell value to the player's ID
        const cell = this.board.getCellById(cellId);
        cell.value = playerId;

        // Rotate the turn
        const nextPlayer = this._playerOrder.shift();
        this.turn = this._playerOrder[0];
        this._playerOrder.push(nextPlayer);

        return true;
    }

    whoWon() {
        let tlTbrDiagonalMatches = [];
        let blTtrDiagonalMatches = [];
        for (let firstIndex = 0; firstIndex < this.board.size; firstIndex++) {
            let horizontalMatches = [];
            let verticalMatches = [];

            for (let secondIndex = 0; secondIndex < this.board.size; secondIndex++) {

                // Check row/horizontal
                const horizontalCell = this.board.getCellByCoords(firstIndex, secondIndex);
                if (horizontalMatches.includes(horizontalCell.value) || secondIndex === 0) {
                    horizontalMatches.push(horizontalCell.value);
                    
                    if (horizontalMatches.length === this.board.size) {
                        return horizontalMatches[0];
                    }
                } else {
                    horizontalMatches = [];
                }

                // Check column/vertical
                const verticalCell = this.board.getCellByCoords(secondIndex, firstIndex);
                if (verticalMatches.includes(verticalCell.value) || secondIndex === 0) {
                    verticalMatches.push(verticalCell.value);

                    if (verticalMatches.length === this.board.size) {
                        return verticalMatches[0];
                    }
                } else {
                    verticalMatches = [];
                }
            }

            // Check top-left to bottom-right diagonal
            const tlTbrDiagonalCell = this.board.getCellByCoords(firstIndex, firstIndex);
            if (tlTbrDiagonalMatches.includes(tlTbrDiagonalCell.value) || firstIndex === 0) {
                tlTbrDiagonalMatches.push(tlTbrDiagonalCell.value);

                if (tlTbrDiagonalMatches.length === this.board.size) {
                    return tlTbrDiagonalMatches[0];
                }
            } else {
                tlTbrDiagonalMatches = [];
            }

            // Check bottom-left to top-right diagonal
            const blTtrDiagonalCell = this.board.getCellByCoords(this.board.size - 1 - firstIndex, firstIndex);
            if (blTtrDiagonalMatches.includes(blTtrDiagonalCell.value) || firstIndex === 0) {
                blTtrDiagonalMatches.push(blTtrDiagonalCell.value);

                if (blTtrDiagonalMatches.length === this.board.size) {
                    return blTtrDiagonalMatches[0];
                }
            } else {
                blTtrDiagonalMatches = [];
            }
        }

        return '';
    }

    end() {
        this.state = 'ended';
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