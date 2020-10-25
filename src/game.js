const Random = require('random-js').Random;

class Game {
    get boardSize() {
        return this.board.length;
    }

    constructor(boardSize) {
        this.id = this._generageGameId();
        this.board = this._generateBoard(boardSize);
        this.turn = '';
        this.nought = '';
        this.cross = '';
        this.won = '';
    }

    addPlayer(playerId) {
        if (this.nought === '') {
            this.nought = playerId;
            return 'O';
        } else if (this.cross === '') {
            this.cross = playerId;
            return 'X';
        } else {
            // TODO: handle third player
        }
    }

    _generageGameId() {
        const r = new Random();
        return r.integer(10000, 99999);
    }

    _generateBoard(size) {
        const board = [];
        for (let rowIndex = 0; rowIndex < size; rowIndex++) {
            const row = [];
            for (let columnIndex = 0; columnIndex < size; columnIndex++) {
                row.push({
                    row: rowIndex,
                    column: columnIndex,
                    value: ''
                });
            }
            board.push(row);
        }
        return board;
    }

    _whoWon() {
        // Check columns
        for (let columnIndex = 0; columnIndex < this.boardSize; columnIndex++) {
            let x = 0;
            let o = 0;
            for (let rowIndex = 0; rowIndex < this.boardSize; rowIndex++) {
                if (this.board[rowIndex][columnIndex].value === 'X')
                    x++;
                if (this.board[rowIndex][columnIndex].value === 'O')
                    o++;
            }

            if (x === this.boardSize)
                return 'X';
            else if (o === this.boardSize)
                return 'O';
        }

        // Check rows
        for (let rowIndex = 0; rowIndex < this.boardSize; rowIndex++) {
            let x = 0;
            let o = 0;
            for (let columnIndex = 0; columnIndex < this.boardSize; columnIndex++) {
                if (this.board[rowIndex][columnIndex].value === 'X')
                    x++;
                if (this.board[rowIndex][columnIndex].value === 'O')
                    o++;
            }

            if (x === this.boardSize)
                return 'X';
            else if (o === this.boardSize)
                return 'O';
        }

        // Check top-left to bottom-right diagonal
        if (this.board[0][0].value === 'X' && this.board[1][1].value === 'X' && this.board[2][2].value === 'X' && this.board[3][3].value === 'X')
            return 'X';

        if (this.board[0][0].value === 'O' && this.board[1][1].value === 'O' && this.board[2][2].value === 'O' && this.board[3][3].value === 'O')
            return 'O';

        // Check bottom-left to top-right diagonal
        if (this.board[3][0].value === 'X' && this.board[2][1].value === 'X' && this.board[1][2].value === 'X' && this.board[0][3].value === 'X')
            return 'X';

        if (this.board[3][0].value === 'O' && this.board[2][1].value === 'O' && this.board[1][2].value === 'O' && this.board[0][3].value === 'O')
            return 'O';

        return '';
    }
}

module.exports = Game;