import { Board } from './board.class';
import { Jewel } from '../jewel/jewel.class';

describe('Tablero', () => {
  let board: Board;

  beforeEach(() => {
    board = new Board(8, 16);
  });

  it('debería crearse con las dimensiones correctas', () => {
    expect(board.getBoard.length).toEqual(8);
    expect(board.getBoard[0].length).toEqual(16);
  });

  it('debería llenarse con joyas', () => {
    for(let i = 0; i < 8; i++) {
      for(let j = 0; j < 16; j++) {
        expect(board.getBoard[i][j]).toBeInstanceOf(Jewel);
      }
    }
  });

  it('Debería poder seleccionar una joya', () => {
    const jewel = board.getBoard[0][0];
    board.selectedJewel = jewel;
    expect(board.selectedJewel).toBe(jewel);
  });

  it('Debería intercambiar dos joyas adyacentes de igual color en caso que no, no moverse', () => {
    const jewel1 = board.getBoard[0][0];
    const jewel2 = board.getBoard[0][1];

    const jewel1Row = jewel1.row;
    const jewel1Column = jewel1.column;
    const jewel2Row = jewel2.row;
    const jewel2Column = jewel2.column;

    board.swapJewels(jewel1, jewel2);

    if (jewel1.color !== jewel2.color) {
      expect(jewel1.row).toBe(jewel2Row);
      expect(jewel1.column).toBe(jewel2Column);
      expect(jewel2.row).toBe(jewel1Row);
      expect(jewel2.column).toBe(jewel1Column);
    } else {
      expect(jewel1.row).toBe(jewel1Row);
      expect(jewel1.column).toBe(jewel1Column);
      expect(jewel2.row).toBe(jewel2Row);
      expect(jewel2.column).toBe(jewel2Column);
    }
  });

});
