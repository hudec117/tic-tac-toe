const GameBoardGenerator = require('./game-board-generator.js');
const Random = require('random-js').Random;

class Game {
    constructor(config) {
        this.id = this._generateGameId();
        this.nought = '';
        this.cross = '';

        const boardGenerator = new GameBoardGenerator(config);
        this.board = boardGenerator.generate();
    }

    _generateGameId() {
        const random = new Random();
        return random.integer(10000, 99999).toString();
    }

    addPlayer(id) {
        if (this.nought === '' && this.cross != id) {
            this.nought = id;
            return true;
        } else if (this.cross === '' && this.nought != id) {
            this.cross = id;
            return true;
        }

        return false;
    }
}

module.exports = Game;