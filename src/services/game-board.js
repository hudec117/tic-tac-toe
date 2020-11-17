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

    toPublicObject() {
        return this.rows;
    }
}

module.exports = GameBoard;