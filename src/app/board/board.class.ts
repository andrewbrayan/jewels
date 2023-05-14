import { Jewel } from '../jewel/jewel.class';
import { JewelFactory } from '../jewel/jewel_factory.class';

type cords = { row: number; column: number };

export class Board {
  private readonly rows: number;
  private readonly columns: number;
  private _board: Jewel[][];
  private _score: number;

  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;
    this._board = [];
    this._score = 0;
    this.generateBoard();
  }

  get grid(): Jewel[][] {
    return this._board;
  }

  get score(): number {
    return this._score;
  }

  private generateBoard(): void {
    for (let row = 0; row < this.rows; row++) {
      this._board[row] = [];
      for (let column = 0; column < this.columns; column++) {
        const jewel = JewelFactory.createRandomJewel([row, column]);
        this._board[row][column] = jewel;
      }
    }
  }

  public moveJewel(jewel1: Jewel, jewel2: Jewel): void {
    const cords1 = { row: jewel1.row, column: jewel1.column };
    const cords2 = { row: jewel2.row, column: jewel2.column };

    // detectar si las joyas seleccionadas son adyacentes
    if (!this.areJewelsAdjacent(cords1, cords2)) return;

    this._board[cords1.row][cords1.column] = jewel2;
    this._board[cords2.row][cords2.column] = jewel1;

    jewel1.row = cords2.row;
    jewel1.column = cords2.column;

    jewel2.row = cords1.row;
    jewel2.column = cords1.column;
  }

  private areJewelsAdjacent(cords1: cords, cords2: cords): boolean {
    const isAdjacentInRow =
      Math.abs(cords1.column - cords2.column) === 1 &&
      cords1.row === cords2.row;
    const isAdjacentInColumn =
      Math.abs(cords1.row - cords2.row) === 1 &&
      cords1.column === cords2.column;

    return isAdjacentInRow || isAdjacentInColumn;
  }

  private isAdjacentToSelectedJewels(
    jewels: Jewel[],
    jewelOneSelected: Jewel,
    jewelTwoSelected: Jewel
  ): boolean {
    const cords1 = {
      row: jewelOneSelected.row,
      column: jewelOneSelected.column,
    };
    const cords2 = {
      row: jewelTwoSelected.row,
      column: jewelTwoSelected.column,
    };

    return jewels.some((jewel) => {
      const cords = { row: jewel.row, column: jewel.column };

      return (
        this.areJewelsAdjacent(cords, cords1) ||
        this.areJewelsAdjacent(cords, cords2)
      );
    });
  }

  public detectAndRemoveMatches(
    jewelOneSelected: Jewel,
    jewelTwoSelected: Jewel
  ): void {
    const matches: Jewel[][] = [];

    // Detección de combinaciones horizontales
    for (let row = 0; row < this.rows; row++) {
      let currentMatch: Jewel[] = [];
      let currentColor = '';

      for (let col = 0; col < this.columns; col++) {
        const jewel = this._board[row][col];

        if (jewel.color === currentColor) {
          currentMatch.push(jewel);
        } else {
          if (currentMatch.length >= 3) {
            if (
              this.isAdjacentToSelectedJewels(
                currentMatch,
                jewelOneSelected,
                jewelTwoSelected
              )
            ) {
              matches.push(currentMatch);
            }
          }

          currentMatch = [jewel];
          currentColor = jewel.color;
        }
      }

      if (currentMatch.length >= 3) {
        if (
          this.isAdjacentToSelectedJewels(
            currentMatch,
            jewelOneSelected,
            jewelTwoSelected
          )
        ) {
          matches.push(currentMatch);
        }
      }
    }

    // Detección de combinaciones verticales
    for (let col = 0; col < this.columns; col++) {
      let currentMatch: Jewel[] = [];
      let currentColor = '';

      for (let row = 0; row < this.rows; row++) {
        const jewel = this._board[row][col];

        if (jewel.color === currentColor) {
          currentMatch.push(jewel);
        } else {
          if (currentMatch.length >= 3) {
            if (
              this.isAdjacentToSelectedJewels(
                currentMatch,
                jewelOneSelected,
                jewelTwoSelected
              )
            ) {
              matches.push(currentMatch);
            }
          }

          currentMatch = [jewel];
          currentColor = jewel.color;
        }
      }

      if (currentMatch.length >= 3) {
        if (
          this.isAdjacentToSelectedJewels(
            currentMatch,
            jewelOneSelected,
            jewelTwoSelected
          )
        ) {
          matches.push(currentMatch);
        }
      }
    }

    // Eliminar las joyas en las combinaciones encontradas
    for (const match of matches) {
      for (const jewel of match) {
        jewel.delete = true;

        setTimeout(() => {
          // Desplazar las joyas encima hacia abajo
          for (let row = jewel.row; row >= 0; row--) {
            if (row - 1 < 0) break;
            const nextJewel = this._board[row - 1][jewel.column];
            const currentJewel = this._board[row][jewel.column];

            this.moveJewel(nextJewel, currentJewel);
          }
        }, 500);
      }

      setTimeout(() => {
        for (let row = 0; row < this.rows; row++) {
          for (let col = 0; col < this.columns; col++) {
            const jewel = this._board[row][col];

            if (jewel.delete) {
              const newJewel = JewelFactory.createRandomJewel([row, col]);
              this._board[row][col] = newJewel;
            }
          }
        }
      }, 800);

      this._score += match.length;
    }
  }

  reset(): void {
    this.generateBoard()
    this._score = 0;
  }
}
