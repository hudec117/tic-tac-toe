const LocalGame = require('./local-game.js');

const dummyId = '92b79b50';
const dummyId2 = 'b0ab31d7';

const config = {
    size: 3
};
let game;

beforeEach(() => {
    game = new LocalGame(config);
});

describe('addPlayer', () => {
    test('first call, returns true', () => {
        // Act
        const success = game.addPlayer(dummyId);

        expect(success).toBe(true);
    });

    test('first call, sets state to playing', () => {
        // Act
        game.addPlayer(dummyId);

        expect(game.state).toBe('playing');
    });

    test('first call, sets turn to piece', () => {
        // Act
        game.addPlayer(dummyId);

        expect(game.turn).not.toBe('');
    });

    test('second call, retuns false', () => {
        game.addPlayer(dummyId);

        // Act
        const success = game.addPlayer(dummyId);

        expect(success).toBe(false);
    });
});

describe('hasPlayer', () => {
    test('no player, returns false', () => {
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

        // Act
        const hasPlayer = game.hasPlayer(dummyId2)

        expect(hasPlayer).toBe(false);
    });
});

describe('takeTurn', () => {
    test('returns false if player not in game', () => {
        game.addPlayer(dummyId);

        const cellId = game.board.rows[0][0].id;

        // Act
        const success = game.takeTurn(dummyId2, cellId);

        expect(success).toBe(false);
    });

    test('returns false if state is waiting', () => {
        const cellId = game.board.rows[0][0].id;

        // Act
        const success = game.takeTurn(dummyId, cellId);

        expect(success).toBe(false);
    });

    test('sets the cell\'s value to the player\'s piece', () => {
        game.addPlayer(dummyId);

        const cell = game.board.rows[0][0];

        const nextPlayer = game.turn;

        // Act
        game.takeTurn(nextPlayer, cell.id);

        expect(cell.value).toBe(nextPlayer);
    });
});