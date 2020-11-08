const GameBoard = require('./game-board.js');

describe('constructor', () => {
    test('given size 3, generates board 3 wide and 3 high', () => {
        // Act
        const board = new GameBoard({
            size: 3
        });

        expect(board.rows.length).toBe(3);
        expect(board.rows[0].length).toBe(3);
    });

    test('given size 4, generates board 4 wide and 4 high', () => {
        // Act
        const board = new GameBoard({
            size: 4
        });

        expect(board.rows.length).toBe(4);
        expect(board.rows[0].length).toBe(4);
    });
});