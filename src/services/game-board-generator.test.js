const GameBoardGenerator = require('./game-board-generator.js');

describe('generate', () => {
    test('given size 3, generates board 3 wide and 3 high', () => {
        const generator = new GameBoardGenerator({
            size: 3
        });

        const board = generator.generate();

        expect(board.length).toBe(3);
        expect(board[0].length).toBe(3);
    });

    test('given size 4, generates board 4 wide and 4 high', () => {
        const generator = new GameBoardGenerator({
            size: 4
        });

        const board = generator.generate();

        expect(board.length).toBe(4);
        expect(board[0].length).toBe(4);
    });
});