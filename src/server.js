/* Author(s): Aurel Hudec
 * Description: Server initialisation.
 */

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

const port = process.env.PORT || 3000;

// Start game server
new (require('./services/game-server.js'))(io);

// Expose "public" folder as static content.
app.use(express.static(path.join(__dirname, 'public')));

http.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});