const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const Game = require('./game');

app.use(express.static(__dirname + '/public'));

let game = new Game(3);

io.on('connection', (socket) => {
    console.log('a user connected');

    game.addPlayer(socket.id);

    io.emit('state', game);

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

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});