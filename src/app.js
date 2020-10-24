const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

const io = require('socket.io')(http);

const HEIGHT = 4;
const WIDTH = 4;
const MATCH = 4;

const DEFAULT_STATE = {
    board: buildBoard(),
    turn: 'X',
    nought: '',
    cross: '',
    won: ''
};

let state = DEFAULT_STATE;

io.on('connection', (socket) => {
    console.log('a user connected');

    if (state.nought === '') {
        state.nought = socket.id;
    } else if (state.cross === '') {
        state.cross = socket.id;
    }

    io.emit('state', state);

    socket.on('turn', cell => {
        const canTakeTurn = (state.turn === 'X' && state.cross === socket.id) || (state.turn === 'O' && state.nought === socket.id);
        if (canTakeTurn) {
            const serverSideCell = state.board[cell.row][cell.column];
            serverSideCell.value = state.turn;

            state.won = whoWon();
            if (state.won !== '') {
                // Someone wins!
                console.log(state.won + ' wins!');
            }

            state.turn = state.turn === 'X' ? 'O' : 'X';
            io.emit('state', state);
        }
    });

    socket.on('reset', () => {
        state = DEFAULT_STATE;
        io.emit('state', state);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

function buildBoard() {
    const board = [];
    for (let rowIndex = 0; rowIndex < HEIGHT; rowIndex++) {
        const row = [];
        for (let columnIndex = 0; columnIndex < WIDTH; columnIndex++) {
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

function whoWon() {
    // Check columns
    for (let columnIndex = 0; columnIndex < WIDTH; columnIndex++) {
        let x = 0;
        let o = 0;
        for (let rowIndex = 0; rowIndex < HEIGHT; rowIndex++) {
            if (state.board[rowIndex][columnIndex].value === 'X')
                x++;
            if (state.board[rowIndex][columnIndex].value === 'O')
                o++;
        }

        if (x === MATCH)
            return 'X';
        else if (o === MATCH)
            return 'O';
    }

    // Check rows
    for (let rowIndex = 0; rowIndex < HEIGHT; rowIndex++) {
        let x = 0;
        let o = 0;
        for (let columnIndex = 0; columnIndex < WIDTH; columnIndex++) {
            if (state.board[rowIndex][columnIndex].value === 'X')
                x++;
            if (state.board[rowIndex][columnIndex].value === 'O')
                o++;
        }

        if (x === MATCH)
            return 'X';
        else if (o === MATCH)
            return 'O';
    }

    // Check top-left to bottom-right diagonal
    if (state.board[0][0].value === 'X' && state.board[1][1].value === 'X' && state.board[2][2].value === 'X' && state.board[3][3].value === 'X')
        return 'X';

    if (state.board[0][0].value === 'O' && state.board[1][1].value === 'O' && state.board[2][2].value === 'O' && state.board[3][3].value === 'O')
        return 'O';

    // Check bottom-left to top-right diagonal
    if (state.board[3][0].value === 'X' && state.board[2][1].value === 'X' && state.board[1][2].value === 'X' && state.board[0][3].value === 'X')
        return 'X';

    if (state.board[3][0].value === 'O' && state.board[2][1].value === 'O' && state.board[1][2].value === 'O' && state.board[0][3].value === 'O')
        return 'O';

    return '';
}

http.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});