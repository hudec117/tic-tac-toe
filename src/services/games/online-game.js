const Game = require('./game.js');

const shuffle = require('shuffle-array');

class OnlineGame extends Game {
    constructor(config) {
        super(config);

        this.state = 'waiting';

        this._availablePieces = shuffle(this.SUPPORTED_PIECES, { copy: true });
        this._playerPieceLookup = new Map();
        this._playerOrder = [];
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

            const firstPlayerPiece = this._playerPieceLookup.get(this._playerOrder[0])
            this.turn = firstPlayerPiece;
        }

        return true;
    }

    hasPlayer(playerId) {
        return this._playerPieceLookup.has(playerId);
    }

    takeTurn(playerId, cellId) {
        const playerPiece = this._playerPieceLookup.get(playerId);

        const canTakeTurn = this.state === 'playing' && this.turn === playerPiece;
        if (!canTakeTurn) {
            return {
                success: false,
                won: ''
            };
        }

        // Update the cell value to the player's piece
        this.board.setCellValueById(cellId, playerPiece);

        // Rotate the turn
        const lastPlayer = this._playerOrder.shift();

        const nextPlayerPiece = this._playerPieceLookup.get(this._playerOrder[0]);
        this.turn = nextPlayerPiece;

        this._playerOrder.push(lastPlayer);

        const won = this.whoWon();
        if (won) {
            this.state = 'ended';
        }

        return {
            success: true,
            won: won
        };
    }

    toPublicObject() {
        return {
            id: this.id,
            type: this.type,
            state: this.state,
            players: Object.fromEntries(this._playerPieceLookup),
            turn: this.turn,
            board: this.board.toPublicObject()
        };
    }
}

module.exports = OnlineGame;