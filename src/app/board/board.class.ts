import { Jewel } from '../jewel/jewel.class';
import { JewelFactory } from '../jewel/jewel_factory.class';

const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

export class Board {
  private readonly rows: number;
  private readonly columns: number;
  private _board: Jewel[][];
  private _score: number;

  private _selectedJewel: Jewel | null;

  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;
    this._board = [];
    this._score = 0;
    this._selectedJewel = null;
    this.generateBoard();
  }

  get getBoard(): Jewel[][] {
    return this._board;
  }

  get getScore(): number {
    return this._score;
  }

  set selectedJewel(jewel: Jewel | null) {
    this._selectedJewel = jewel;
  }

  get selectedJewel(): Jewel | null {
    return this._selectedJewel;
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

  private searchMatchedGroup(jewel: Jewel, visited: boolean[][] = []): Jewel[] {
    if (visited.length === 0) {
      for (let row = 0; row < this.rows; row++) {
        visited[row] = new Array(this.columns).fill(false);
      }
    }

    const row = jewel.row;
    const col = jewel.column;

    if (visited[row][col]) {
      return [];
    }

    visited[row][col] = true;
    let group = [jewel];

    for (let [dRow, dCol] of directions) {
      const newRow = row + dRow;
      const newCol = col + dCol;

      if (
        this.isValid(newRow, newCol) &&
        !visited[newRow][newCol] &&
        this._board[newRow][newCol].color === jewel.color
      ) {
        group.push(
          ...this.searchMatchedGroup(this._board[newRow][newCol], visited)
        );
      }
    }

    return group;
  }

  private deleteMatchedGroups(jewels: Jewel[]): void {
    for (let jewel of jewels) {
      const group = this.searchMatchedGroup(jewel);
      if (group.length >= 3) {
        for (let jewel of group) {
          jewel.delete = true;
          this._score += 1
          this.moveUpJewel(jewel);
        }
      }
    }
  }

  private moveUpJewel(deleteJewel: Jewel): void {
    if (deleteJewel.row === 0) return;

    const upJewel = this._board[deleteJewel.row - 1][deleteJewel.column];
    const tempRow = deleteJewel.row;
    const tempCol = deleteJewel.column;

    deleteJewel.row = upJewel.row;
    deleteJewel.column = upJewel.column;
    upJewel.row = tempRow;
    upJewel.column = tempCol;

    this._board[deleteJewel.row][deleteJewel.column] = deleteJewel;
    this._board[upJewel.row][upJewel.column] = upJewel;

    this.moveUpJewel(deleteJewel)
  }

  private regenerateJewels(): void {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        const jewel = this._board[row][col];

        if (jewel.delete) {
          this._board[row][col] = JewelFactory.createRandomJewel([row, col]);
        }
      }
    }
  }

  public swapJewels(jewel1: Jewel, jewel2: Jewel): void {
    if ( this.areJewelsAdjacent(jewel1, jewel2) && jewel1.color !== jewel2.color ) {
      const tempRow = jewel1.row;
      const tempCol = jewel1.column;

      jewel1.row = jewel2.row;
      jewel1.column = jewel2.column;
      jewel2.row = tempRow;
      jewel2.column = tempCol;

      this._board[jewel1.row][jewel1.column] = jewel1;
      this._board[jewel2.row][jewel2.column] = jewel2;

      this.selectedJewel = null;

      // Eliminar solo los nuevos grupos
      this.deleteMatchedGroups([jewel1, jewel2]);
      setTimeout(() => {
        this.regenerateJewels()
      }, 200);
    }
  }

  reset(): void {
    this.generateBoard();
    this._score = 0;
  }

  //* verifications functions
  public findAllMatches(): Jewel[][] {
    const matchedGroups: Jewel[][] = [];

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        const jewel = this._board[row][col];

        const group: Jewel[] = this.searchMatchedGroup(jewel);

        if (group.length >= 3) {
          matchedGroups.push(group);
        }
      }
    }

    return matchedGroups;
  }

  private areJewelsAdjacent(jewel1: Jewel, jewel2: Jewel): boolean {
    const isAdjacentInRow =
      Math.abs(jewel1.column - jewel2.column) === 1 &&
      jewel1.row === jewel2.row;
    const isAdjacentInColumn =
      Math.abs(jewel1.row - jewel2.row) === 1 &&
      jewel1.column === jewel2.column;

    return isAdjacentInRow || isAdjacentInColumn;
  }

  private isValid(row: number, col: number): boolean {
    return row >= 0 && row < this.rows && col >= 0 && col < this.columns;
  }
}
