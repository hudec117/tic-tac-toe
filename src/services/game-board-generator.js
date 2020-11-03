class GameBoardGenerator {
    constructor(config) {
        this.config = config;
    }

    generate() {
        const board = [];
        for (let rowIndex = 0; rowIndex < this.config.size; rowIndex++) {
            const row = [];
            for (let columnIndex = 0; columnIndex < this.config.size; columnIndex++) {
                row.push({
                    row: rowIndex,
                    column: columnIndex,
                    type: ''
                });
            }
            board.push(row);
        }
        return board;
    }
}

module.exports = GameBoardGenerator;