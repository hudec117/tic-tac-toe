const Game = require('./game.js');

const dummyId = '92b79b50';
const dummyId2 = 'b0ab31d7';
const dummyId3 = 'a0864877';

const config = {
    size: 3
};
let game;

beforeEach(() => {
    game = new Game(config);
});

describe('constructor', () => {
    test('sets ID to 5 digit number', () => {
        // Act
        const generatedId = new Game(config).id;

        expect(generatedId.toString().length).toBe(5);
    });

    test('sets state to waiting', () => {
        // Act
        const state = new Game(config).state;

        expect(state).toBe('waiting');
    });
});

describe('addPlayer', () => {
    test('returns true if piece is available', () => {
        // Act
        const success = game.addPlayer(dummyId);

        expect(success).toBe(true);
    });

    test('returns false if player is already added', () => {
        game.addPlayer(dummyId);

        // Act
        const success = game.addPlayer(dummyId);

        expect(success).toBe(false);
    });

    test('sets state to playing when all players have joined', () => {
        game.addPlayer(dummyId);

        // Act
        game.addPlayer(dummyId2);

        expect(game.state).toBe('playing');
    });

    test('sets turn to a player when all players have joined', () => {
        game.addPlayer(dummyId);

        // Act
        game.addPlayer(dummyId2);

        expect(game.turn).not.toBe('');
    });

    test('returns false if adding player when game is playing', () => {
        game.addPlayer(dummyId);
        game.addPlayer(dummyId2);

        // Act
        const success = game.addPlayer(dummyId3);

        expect(success).toBe(false);
    });
});

describe('hasPlayer', () => {
    test('no players, returns false', () => {
        // Act
        const hasPlayer = game.hasPlayer(dummyId);

        expect(hasPlayer).toBe(false);
    });

    test('player in game, returns true', () => {
        game.addPlayer(dummyId);

        // Act
        const hasPlayer = game.hasPlayer(dummyId)

        expect(hasPlayer).toBe(true);
    });

    test('player not in game, returns false', () => {
        game.addPlayer(dummyId);
        game.addPlayer(dummyId2);

        // Act
        const hasPlayer = game.hasPlayer(dummyId3)

        expect(hasPlayer).toBe(false);
    });
});

describe('takeTurn', () => {
    test('returns true if player\'s turn', () => {
        game.addPlayer(dummyId);
        game.addPlayer(dummyId2);

        const cellId = game.board.rows[0][0].id;

        // Act
        const success = game.takeTurn(dummyId, cellId);

        expect(success).toBe(true);
    });

    test('returns false if not player\'s turn', () => {
        game.addPlayer(dummyId);
        game.addPlayer(dummyId2);

        const cellId = game.board.rows[0][0].id;

        // Act
        const success = game.takeTurn(dummyId2, cellId);

        expect(success).toBe(false);
    });

    test('returns false if player not in game', () => {
        game.addPlayer(dummyId);
        game.addPlayer(dummyId2);

        const cellId = game.board.rows[0][0].id;

        // Act
        const success = game.takeTurn(dummyId3, cellId);

        expect(success).toBe(false);
    });

    test('returns false if state is waiting', () => {
        game.addPlayer(dummyId);

        const cellId = game.board.rows[0][0].id;

        // Act
        const success = game.takeTurn(dummyId, cellId);

        expect(success).toBe(false);
    });

    test('toggles the turn to other player', () => {
        game.addPlayer(dummyId);
        game.addPlayer(dummyId2);
        const previousTurn = game.turn;

        const cellId = game.board.rows[0][0].id;

        // Act
        game.takeTurn(game.turn, cellId);

        expect(game.turn).not.toBe(previousTurn);
    });

    test('sets the cells type to the player\'s piece', () => {
        game.addPlayer(dummyId);
        game.addPlayer(dummyId2);

        const cell = game.board.rows[0][0];

        const nextPlayer = game.turn;

        // Act
        game.takeTurn(nextPlayer, cell.id);

        const playerPiece = game.toPublicObject().players[nextPlayer];
        expect(cell.type).toBe(playerPiece);
    });
});