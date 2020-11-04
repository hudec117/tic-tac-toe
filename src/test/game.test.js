const Game = require('../services/game.js');

const dummyId = '9fd2ea08c96d45f5';
const dummyId2 = '561223e1fcbe451d';

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
    test('returns true if nought is empty', () => {
        game.nought = '';
        expect(game.addPlayer(dummyId)).toBe(true);
    });

    test('returns true if cross is empty', () => {
        game.cross = '';
        expect(game.addPlayer(dummyId)).toBe(true);
    });

    test('returns false if nought and cross are populated', () => {
        game.nought = '6c188c0334924a7';
        game.cross = '75a38654eecc4b7a';
        expect(game.addPlayer(dummyId)).toBe(false);
    });

    test('returns false is ID is already in nought', () => {
        game.nought = dummyId;
        expect(game.addPlayer(dummyId)).toBe(false);
    });

    test('returns false is ID is already in cross', () => {
        game.cross = dummyId;
        expect(game.addPlayer(dummyId)).toBe(false);
    });

    test('first call, assigns ID to nought', () => {
        game.addPlayer(dummyId);
        expect(game.nought).toBe(dummyId);
    });

    test('second call, assigns ID to cross', () => {
        game.addPlayer(dummyId);
        game.addPlayer(dummyId2);
        expect(game.cross).toBe(dummyId2);
    });
});