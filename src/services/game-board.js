/* Author(s): Aurel Hudec
 * Description: Class to generate and represent the board.
 */

const { v4: uuidv4 } = require('uuid');

class GameBoard {
    constructor(config) {
        this.size = config.size;
        this.rows = [];
        this._cellLookup = new Map();

        this._generateBoard();
    }

    _generateBoard() {
        for (let rowIndex = 0; rowIndex < this.size; rowIndex++) {
            const row = [];
            for (let columnIndex = 0; columnIndex < this.size; columnIndex++) {
                const cell = {
                    id: uuidv4(),
                    row: rowIndex,
                    column: columnIndex,
                    value: ''
                };

                row.push(cell);

                this._cellLookup.set(cell.id, cell);
            }
            this.rows.push(row);
        }

        // Randomly block cells in the board

        // One blocked cell per size over 3x3
        const numBlockedCells = (this.size - 3) * 2;
        for (let i = 0; i < numBlockedCells; i++) {
            const randomRow = Math.floor(Math.random() * this.size);
            const randomColumn = Math.floor(Math.random() * this.size);

            this.rows[randomRow][randomColumn].value = 'block';
        }
    }

    getCellById(id) {
        return this._cellLookup.get(id);
    }

    getCellByCoords(row, column) {
        return this.rows[row][column];
    }

    getCells() {
        return this._cellLookup.values();
    }

    setCellValueById(id, value) {
        this._cellLookup.get(id).value = value;
    }

    setCellValueByCoords(row, column, value) {
        this.rows[row][column].value = value;
    }

    toPublicObject() {
        return this.rows;
    }
}

module.exports = GameBoard;