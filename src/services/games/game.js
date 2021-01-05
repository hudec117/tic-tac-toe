/* Author(s): Aurel Hudec
 * Description: Base class defining the structure of a game. This class is abstract.
 */

const GameBoard = require('../game-board.js');

const Random = require('random-js').Random;

class Game {
    constructor(config) {
        this.SUPPORTED_PIECES = ['X', 'O'];
        this.MATCH = 3;

        this.id = this._generateGameId();
        this.type = config.type;
        this.state = 'waiting';
        this.turn = '';
        this.board = new GameBoard(config);
        this.scores = this.SUPPORTED_PIECES.reduce((scores, piece) => {
            scores[piece] = 0;
            return scores;
        }, {});

        this._config = config;
    }

    _generateGameId() {
        const random = new Random();
        return random.integer(10000, 99999).toString();
    }

    addPlayer(playerId) {
        throw new Error('Not implemented.');
    }

    hasPlayer(playerId) {
        throw new Error('Not implemented.');
    }

    takeTurn(playerId, cellId) {
        throw new Error('Not implemented.');
    }

    restartGame() {
        this.state = 'playing';
        this.board = new GameBoard(this._config);
    }

    whoWon() {
        const matchBoardOffset = this.MATCH - 1;
        for (let rowIndex = 0; rowIndex < this.board.size - matchBoardOffset; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.board.size - matchBoardOffset; columnIndex++) {

                // Check sub-grid at coordinates
                for (let subGridIndex = 0; subGridIndex < this.MATCH; subGridIndex++) {
                    // Check column at subGridIndex
                    const columnMatches = [];
                    for (let subGridRowIndex = 0; subGridRowIndex < this.MATCH; subGridRowIndex++) {
                        const cell = this.board.getCellByCoords(rowIndex + subGridRowIndex, columnIndex + subGridIndex);
                        if (subGridRowIndex === 0 || (cell.value && columnMatches.includes(cell.value))) {
                            columnMatches.push(cell.value);
                        }
                    }

                    if (columnMatches.length === this.MATCH) {
                        return columnMatches[0];
                    }

                    // Check row at subGridIndex
                    const rowMatches = [];
                    for (let subGridColumnIndex = 0; subGridColumnIndex < this.MATCH; subGridColumnIndex++) {
                        const cell = this.board.getCellByCoords(rowIndex + subGridIndex, columnIndex + subGridColumnIndex);
                        if (subGridColumnIndex === 0 || (cell.value && rowMatches.includes(cell.value))) {
                            rowMatches.push(cell.value);
                        }
                    }

                    if (rowMatches.length === this.MATCH) {
                        return rowMatches[0];
                    }

                }

                // Check diagonals
                const tlTbrDiagMatches = [];
                const blTtrDiagMatches = [];
                for (let subGridDiagIndex = 0; subGridDiagIndex < this.MATCH; subGridDiagIndex++) {
                    const tlCell = this.board.getCellByCoords(rowIndex + subGridDiagIndex, columnIndex + subGridDiagIndex);
                    if (subGridDiagIndex === 0 || (tlCell.value && tlTbrDiagMatches.includes(tlCell.value))) {
                        tlTbrDiagMatches.push(tlCell.value);
                    }

                    const blCell = this.board.getCellByCoords((rowIndex + matchBoardOffset) - subGridDiagIndex, columnIndex + subGridDiagIndex);
                    if (subGridDiagIndex === 0 || (blCell.value && blTtrDiagMatches.includes(blCell.value))) {
                        blTtrDiagMatches.push(blCell.value);
                    }
                }

                if (tlTbrDiagMatches.length === this.MATCH) {
                    return tlTbrDiagMatches[0];
                }

                if (blTtrDiagMatches.length === this.MATCH) {
                    return blTtrDiagMatches[0];
                }
            }
        }

        // Check if the board is full, if so then it's a draw.
        let populatedCells = 0;
        for (const cell of this.board.getCells()) {
            if (cell.value !== '') {
                populatedCells++;
            }
        }
        const draw = populatedCells === this.board.size * this.board.size;

        return draw ? 'draw' : '';
    }

    toPublicObject() {
        throw new Error('Not implemented.');
    }
}

module.exports = Game;