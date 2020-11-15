const Game = require('./game.js');

const dummyId = '92b79b50';
const dummyId2 = 'b0ab31d7';
const dummyId3 = 'a0864877';

const config = {
    size: 3
};
let threePlayerGame;

beforeEach(() => {
    threePlayerGame = new Game(config);
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
        const success = threePlayerGame.addPlayer(dummyId);

        expect(success).toBe(true);
    });

    test('returns false if player is already added', () => {
        threePlayerGame.addPlayer(dummyId);

        // Act
        const success = threePlayerGame.addPlayer(dummyId);

        expect(success).toBe(false);
    });

    test('sets state to playing when all players have joined', () => {
        threePlayerGame.addPlayer(dummyId);

        // Act
        threePlayerGame.addPlayer(dummyId2);

        expect(threePlayerGame.state).toBe('playing');
    });

    test('sets turn to a player when all players have joined', () => {
        threePlayerGame.addPlayer(dummyId);

        // Act
        threePlayerGame.addPlayer(dummyId2);

        expect(threePlayerGame.turn).not.toBe('');
    });

    test('returns false if adding player when game is playing', () => {
        threePlayerGame.addPlayer(dummyId);
        threePlayerGame.addPlayer(dummyId2);

        // Act
        const success = threePlayerGame.addPlayer(dummyId3);

        expect(success).toBe(false);
    });
});

describe('hasPlayer', () => {
    test('no players, returns false', () => {
        // Act
        const hasPlayer = threePlayerGame.hasPlayer(dummyId);

        expect(hasPlayer).toBe(false);
    });

    test('player in game, returns true', () => {
        threePlayerGame.addPlayer(dummyId);

        // Act
        const hasPlayer = threePlayerGame.hasPlayer(dummyId)

        expect(hasPlayer).toBe(true);
    });

    test('player not in game, returns false', () => {
        threePlayerGame.addPlayer(dummyId);
        threePlayerGame.addPlayer(dummyId2);

        // Act
        const hasPlayer = threePlayerGame.hasPlayer(dummyId3)

        expect(hasPlayer).toBe(false);
    });
});

describe('takeTurn', () => {
    test('returns true if player\'s turn', () => {
        threePlayerGame.addPlayer(dummyId);
        threePlayerGame.addPlayer(dummyId2);

        const cellId = threePlayerGame.board.rows[0][0].id;

        // Act
        const success = threePlayerGame.takeTurn(dummyId, cellId);

        expect(success).toBe(true);
    });

    test('returns false if not player\'s turn', () => {
        threePlayerGame.addPlayer(dummyId);
        threePlayerGame.addPlayer(dummyId2);

        const cellId = threePlayerGame.board.rows[0][0].id;

        // Act
        const success = threePlayerGame.takeTurn(dummyId2, cellId);

        expect(success).toBe(false);
    });

    test('returns false if player not in game', () => {
        threePlayerGame.addPlayer(dummyId);
        threePlayerGame.addPlayer(dummyId2);

        const cellId = threePlayerGame.board.rows[0][0].id;

        // Act
        const success = threePlayerGame.takeTurn(dummyId3, cellId);

        expect(success).toBe(false);
    });

    test('returns false if state is waiting', () => {
        threePlayerGame.addPlayer(dummyId);

        const cellId = threePlayerGame.board.rows[0][0].id;

        // Act
        const success = threePlayerGame.takeTurn(dummyId, cellId);

        expect(success).toBe(false);
    });

    test('toggles the turn to other player', () => {
        threePlayerGame.addPlayer(dummyId);
        threePlayerGame.addPlayer(dummyId2);
        const previousTurn = threePlayerGame.turn;

        const cellId = threePlayerGame.board.rows[0][0].id;

        // Act
        threePlayerGame.takeTurn(threePlayerGame.turn, cellId);

        expect(threePlayerGame.turn).not.toBe(previousTurn);
    });

    test('sets the cells type to the player\'s piece', () => {
        threePlayerGame.addPlayer(dummyId);
        threePlayerGame.addPlayer(dummyId2);

        const cell = threePlayerGame.board.rows[0][0];

        const nextPlayer = threePlayerGame.turn;

        // Act
        threePlayerGame.takeTurn(nextPlayer, cell.id);

        expect(cell.value).toBe(nextPlayer);
    });
});

describe('whoWon', () => {
    test('player matches 3 in a column, returns player ID', () => {
        threePlayerGame.addPlayer(dummyId);
        threePlayerGame.addPlayer(dummyId2);

        threePlayerGame.takeTurn(dummyId, threePlayerGame.board.rows[0][0].id);
        threePlayerGame.takeTurn(dummyId2, threePlayerGame.board.rows[0][2].id);
        threePlayerGame.takeTurn(dummyId, threePlayerGame.board.rows[1][0].id);
        threePlayerGame.takeTurn(dummyId2, threePlayerGame.board.rows[1][2].id);
        threePlayerGame.takeTurn(dummyId, threePlayerGame.board.rows[2][0].id);

        // Act
        const playerId = threePlayerGame.whoWon();

        expect(playerId).toBe(dummyId);
    });

    test('player matches 3 in a row, returns player ID', () => {
        threePlayerGame.addPlayer(dummyId);
        threePlayerGame.addPlayer(dummyId2);

        threePlayerGame.takeTurn(dummyId, threePlayerGame.board.rows[0][0].id);
        threePlayerGame.takeTurn(dummyId2, threePlayerGame.board.rows[2][0].id);
        threePlayerGame.takeTurn(dummyId, threePlayerGame.board.rows[0][1].id);
        threePlayerGame.takeTurn(dummyId2, threePlayerGame.board.rows[1][0].id);
        threePlayerGame.takeTurn(dummyId, threePlayerGame.board.rows[0][2].id);

        // Act
        const playerId = threePlayerGame.whoWon();

        expect(playerId).toBe(dummyId);
    });

    test('player matches 3 from top-left to bottom-right diagonal, returns player ID', () => {
        threePlayerGame.addPlayer(dummyId);
        threePlayerGame.addPlayer(dummyId2);

        threePlayerGame.takeTurn(dummyId, threePlayerGame.board.rows[0][0].id);
        threePlayerGame.takeTurn(dummyId2, threePlayerGame.board.rows[2][0].id);
        threePlayerGame.takeTurn(dummyId, threePlayerGame.board.rows[1][1].id);
        threePlayerGame.takeTurn(dummyId2, threePlayerGame.board.rows[1][0].id);
        threePlayerGame.takeTurn(dummyId, threePlayerGame.board.rows[2][2].id);

        // Act
        const playerId = threePlayerGame.whoWon();

        expect(playerId).toBe(dummyId);
    });

    test('player matches 3 from bottom-left to top-right diagonal, returns player ID', () => {
        threePlayerGame.addPlayer(dummyId);
        threePlayerGame.addPlayer(dummyId2);

        threePlayerGame.takeTurn(dummyId, threePlayerGame.board.rows[2][0].id);
        threePlayerGame.takeTurn(dummyId2, threePlayerGame.board.rows[0][0].id);
        threePlayerGame.takeTurn(dummyId, threePlayerGame.board.rows[1][1].id);
        threePlayerGame.takeTurn(dummyId2, threePlayerGame.board.rows[1][0].id);
        threePlayerGame.takeTurn(dummyId, threePlayerGame.board.rows[0][2].id);

        // Act
        const playerId = threePlayerGame.whoWon();

        expect(playerId).toBe(dummyId);
    });

    test('player matches 4 in a column, returns player ID', () => {
        const fourPlayerGame = new Game({
            size: 4
        });
        fourPlayerGame.addPlayer(dummyId);
        fourPlayerGame.addPlayer(dummyId2);

        fourPlayerGame.takeTurn(dummyId, fourPlayerGame.board.rows[0][0].id);
        fourPlayerGame.takeTurn(dummyId2, fourPlayerGame.board.rows[0][3].id);
        fourPlayerGame.takeTurn(dummyId, fourPlayerGame.board.rows[1][0].id);
        fourPlayerGame.takeTurn(dummyId2, fourPlayerGame.board.rows[1][3].id);
        fourPlayerGame.takeTurn(dummyId, fourPlayerGame.board.rows[2][0].id);
        fourPlayerGame.takeTurn(dummyId2, fourPlayerGame.board.rows[2][3].id);
        fourPlayerGame.takeTurn(dummyId, fourPlayerGame.board.rows[3][0].id);

        // Act
        const playerId = fourPlayerGame.whoWon();

        expect(playerId).toBe(dummyId);
    });

    test('player matches 4 in a row, returns player ID', () => {
        const fourPlayerGame = new Game({
            size: 4
        });
        fourPlayerGame.addPlayer(dummyId);
        fourPlayerGame.addPlayer(dummyId2);

        fourPlayerGame.takeTurn(dummyId, fourPlayerGame.board.rows[0][0].id);
        fourPlayerGame.takeTurn(dummyId2, fourPlayerGame.board.rows[3][0].id);
        fourPlayerGame.takeTurn(dummyId, fourPlayerGame.board.rows[0][1].id);
        fourPlayerGame.takeTurn(dummyId2, fourPlayerGame.board.rows[3][1].id);
        fourPlayerGame.takeTurn(dummyId, fourPlayerGame.board.rows[0][2].id);
        fourPlayerGame.takeTurn(dummyId2, fourPlayerGame.board.rows[3][2].id);
        fourPlayerGame.takeTurn(dummyId, fourPlayerGame.board.rows[0][3].id);

        // Act
        const playerId = fourPlayerGame.whoWon();

        expect(playerId).toBe(dummyId);
    });

    test('player matches 4 from top-left to bottom-right diagonal, returns player ID', () => {
        const fourPlayerGame = new Game({
            size: 4
        });
        fourPlayerGame.addPlayer(dummyId);
        fourPlayerGame.addPlayer(dummyId2);

        fourPlayerGame.takeTurn(dummyId, fourPlayerGame.board.rows[0][0].id);
        fourPlayerGame.takeTurn(dummyId2, fourPlayerGame.board.rows[3][0].id);
        fourPlayerGame.takeTurn(dummyId, fourPlayerGame.board.rows[1][1].id);
        fourPlayerGame.takeTurn(dummyId2, fourPlayerGame.board.rows[2][0].id);
        fourPlayerGame.takeTurn(dummyId, fourPlayerGame.board.rows[2][2].id);
        fourPlayerGame.takeTurn(dummyId2, fourPlayerGame.board.rows[3][1].id);
        fourPlayerGame.takeTurn(dummyId, fourPlayerGame.board.rows[3][3].id);

        // Act
        const playerId = fourPlayerGame.whoWon();

        expect(playerId).toBe(dummyId);
    });

    test('player matches 4 from bottom-left to top-right diagonal, returns player ID', () => {
        const fourPlayerGame = new Game({
            size: 4
        });
        fourPlayerGame.addPlayer(dummyId);
        fourPlayerGame.addPlayer(dummyId2);

        fourPlayerGame.takeTurn(dummyId, fourPlayerGame.board.rows[3][0].id);
        fourPlayerGame.takeTurn(dummyId2, fourPlayerGame.board.rows[3][2].id);
        fourPlayerGame.takeTurn(dummyId, fourPlayerGame.board.rows[2][1].id);
        fourPlayerGame.takeTurn(dummyId2, fourPlayerGame.board.rows[3][3].id);
        fourPlayerGame.takeTurn(dummyId, fourPlayerGame.board.rows[1][2].id);
        fourPlayerGame.takeTurn(dummyId2, fourPlayerGame.board.rows[2][3].id);
        fourPlayerGame.takeTurn(dummyId, fourPlayerGame.board.rows[0][3].id);

        // Act
        const playerId = fourPlayerGame.whoWon();

        expect(playerId).toBe(dummyId);
    });
});

describe('end', () => {
    test('sets state to ended', () => {
        // Act
        threePlayerGame.end();

        expect(threePlayerGame.state).toBe('ended');
    });
});