const Game = require('./game.js');

class StubGame extends Game {
    constructor(config) {
        super(config);
    }

    addPlayer(playerId) { }

    hasPlayer(playerId) { }

    takeTurn(playerId, cellId) { }
}

const dummyId = '92b79b50';

const threeConfig = {
    size: 3
};
const fourConfig = {
    size: 4
};

let threeGame, fourGame;

beforeEach(() => {
    threeGame = new StubGame(threeConfig);
    fourGame = new StubGame(fourConfig);
});

describe('constructor', () => {
    test('sets state to waiting', () => {
        // Act
        const state = new StubGame(threeConfig).state;

        expect(state).toBe('waiting');
    });
});

describe('whoWon', () => {
    test('player matches 3 in a column, returns player ID', () => {
        threeGame.board.setCellValueByCoords(0, 0, dummyId);
        threeGame.board.setCellValueByCoords(1, 0, dummyId);
        threeGame.board.setCellValueByCoords(2, 0, dummyId);

        // Act
        const playerId = threeGame.whoWon();

        expect(playerId).toBe(dummyId);
    });

    test('player matches 3 in a row, returns player ID', () => {
        threeGame.board.setCellValueByCoords(0, 0, dummyId);
        threeGame.board.setCellValueByCoords(0, 1, dummyId);
        threeGame.board.setCellValueByCoords(0, 2, dummyId);

        // Act
        const playerId = threeGame.whoWon();

        expect(playerId).toBe(dummyId);
    });

    test('player matches 3 from top-left to bottom-right diagonal, returns player ID', () => {
        threeGame.board.setCellValueByCoords(0, 0, dummyId);
        threeGame.board.setCellValueByCoords(1, 1, dummyId);
        threeGame.board.setCellValueByCoords(2, 2, dummyId);

        // Act
        const playerId = threeGame.whoWon();

        expect(playerId).toBe(dummyId);
    });

    test('player matches 3 from bottom-left to top-right diagonal, returns player ID', () => {
        threeGame.board.setCellValueByCoords(2, 0, dummyId);
        threeGame.board.setCellValueByCoords(1, 1, dummyId);
        threeGame.board.setCellValueByCoords(0, 2, dummyId);

        // Act
        const playerId = threeGame.whoWon();

        expect(playerId).toBe(dummyId);
    });

    test('player matches 3 in a 4x4 grid column, returns player ID', () => {
        fourGame.board.setCellValueByCoords(0, 0, dummyId);
        fourGame.board.setCellValueByCoords(1, 0, dummyId);
        fourGame.board.setCellValueByCoords(2, 0, dummyId);

        // Act
        const playerId = fourGame.whoWon();

        expect(playerId).toBe(dummyId);
    });

    test('player matches 3 in a 4x4 grid row, returns player ID', () => {
        fourGame.board.setCellValueByCoords(0, 0, dummyId);
        fourGame.board.setCellValueByCoords(0, 1, dummyId);
        fourGame.board.setCellValueByCoords(0, 2, dummyId);

        // Act
        const playerId = fourGame.whoWon();

        expect(playerId).toBe(dummyId);
    });

    test('player matches 3 from top-left to bottom-right diagonal in 4x4 grid, returns player ID', () => {
        fourGame.board.setCellValueByCoords(0, 0, dummyId);
        fourGame.board.setCellValueByCoords(1, 1, dummyId);
        fourGame.board.setCellValueByCoords(2, 2, dummyId);

        // Act
        const playerId = fourGame.whoWon();

        expect(playerId).toBe(dummyId);
    });

    test('player matches 3 from bottom-left to top-right diagonal in 4x4 grid, returns player ID', () => {
        fourGame.board.setCellValueByCoords(3, 0, dummyId);
        fourGame.board.setCellValueByCoords(2, 1, dummyId);
        fourGame.board.setCellValueByCoords(1, 2, dummyId);

        // Act
        const playerId = fourGame.whoWon();

        expect(playerId).toBe(dummyId);
    });
});