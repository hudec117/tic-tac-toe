const Game = require('./game.js');

const dummyId = '9fd2ea08c96d45f5';

const config = {
    size: 3
};
let game;

beforeEach(() => {
    game = new Game(config);
});

describe('constructor', () => {
    test('sets ID to 5 digit number', () => {
        const generatedId = new Game(config).id;
        expect(generatedId.toString().length).toBe(5);
    });
});

describe('addPlayer', () => {
    test('returns true if piece is available', () => {
        expect(game.addPlayer(dummyId)).toBe(true);
    });

    test('returns false if no pieces available', () => {
        game.availablePieces = [];
        expect(game.addPlayer(dummyId)).toBe(false);
    });

    test('returns false is ID is already in players', () => {
        game.players[dummyId] = 'O';
        expect(game.addPlayer(dummyId)).toBe(false);
    });
});

// describe('takeTurn', () => {
//     test('', () => {

//     });
// });