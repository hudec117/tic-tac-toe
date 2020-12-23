const OnlineGame = require('./online-game.js');

const dummyId = '92b79b50';
const dummyId2 = 'b0ab31d7';
const dummyId3 = 'a0864877';

const threeConfig = {
    size: 3
};
const fourConfig = {
    size: 4
};
let threeGame, fourGame;

beforeEach(() => {
    threeGame = new OnlineGame(threeConfig);
    fourGame = new OnlineGame(fourConfig);
});

describe('addPlayer', () => {
    test('returns true if piece is available', () => {
        // Act
        const success = threeGame.addPlayer(dummyId);

        expect(success).toBe(true);
    });

    test('returns false if player is already added', () => {
        threeGame.addPlayer(dummyId);

        // Act
        const success = threeGame.addPlayer(dummyId);

        expect(success).toBe(false);
    });

    test('sets state to playing when all players have joined', () => {
        threeGame.addPlayer(dummyId);

        // Act
        threeGame.addPlayer(dummyId2);

        expect(threeGame.state).toBe('playing');
    });

    test('sets turn to a player piece when all players have joined', () => {
        threeGame.addPlayer(dummyId);

        // Act
        threeGame.addPlayer(dummyId2);

        expect(threeGame.turn).not.toBe('');
    });

    test('returns false if adding player when game is playing', () => {
        threeGame.addPlayer(dummyId);
        threeGame.addPlayer(dummyId2);

        // Act
        const success = threeGame.addPlayer(dummyId3);

        expect(success).toBe(false);
    });
});

describe('hasPlayer', () => {
    test('no players, returns false', () => {
        // Act
        const hasPlayer = threeGame.hasPlayer(dummyId);

        expect(hasPlayer).toBe(false);
    });

    test('player in game, returns true', () => {
        threeGame.addPlayer(dummyId);

        // Act
        const hasPlayer = threeGame.hasPlayer(dummyId)

        expect(hasPlayer).toBe(true);
    });

    test('player not in game, returns false', () => {
        threeGame.addPlayer(dummyId);
        threeGame.addPlayer(dummyId2);

        // Act
        const hasPlayer = threeGame.hasPlayer(dummyId3)

        expect(hasPlayer).toBe(false);
    });
});

describe('takeTurn', () => {
    test('returns true if player\'s turn', () => {
        threeGame.addPlayer(dummyId);
        threeGame.addPlayer(dummyId2);

        const cellId = threeGame.board.rows[0][0].id;

        // Act
        const success = threeGame.takeTurn(dummyId, cellId);

        expect(success).toBe(true);
    });

    test('returns false if not player\'s turn', () => {
        threeGame.addPlayer(dummyId);
        threeGame.addPlayer(dummyId2);

        const cellId = threeGame.board.rows[0][0].id;

        // Act
        const success = threeGame.takeTurn(dummyId2, cellId);

        expect(success).toBe(false);
    });

    test('returns false if player not in game', () => {
        threeGame.addPlayer(dummyId);
        threeGame.addPlayer(dummyId2);

        const cellId = threeGame.board.rows[0][0].id;

        // Act
        const success = threeGame.takeTurn(dummyId3, cellId);

        expect(success).toBe(false);
    });

    test('returns false if state is waiting', () => {
        threeGame.addPlayer(dummyId);

        const cellId = threeGame.board.rows[0][0].id;

        // Act
        const success = threeGame.takeTurn(dummyId, cellId);

        expect(success).toBe(false);
    });

    test('toggles the turn to other player', () => {
        threeGame.addPlayer(dummyId);
        threeGame.addPlayer(dummyId2);
        const previousTurn = threeGame.turn;

        const cellId = threeGame.board.rows[0][0].id;

        // Act
        threeGame.takeTurn(dummyId, cellId);

        expect(threeGame.turn).not.toBe(previousTurn);
    });

    test('sets the cell\'s value to the player\'s piece', () => {
        threeGame.addPlayer(dummyId);
        threeGame.addPlayer(dummyId2);

        const cell = threeGame.board.rows[0][0];

        const nextPlayerPiece = threeGame.turn;

        // Act
        threeGame.takeTurn(dummyId, cell.id);

        expect(cell.value).toBe(nextPlayerPiece);
    });
});