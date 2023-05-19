import { Component, ViewChild, ElementRef } from '@angular/core';
import { Board } from './board/board.class';
import { Jewel } from './jewel/jewel.class';

const GRID_ROWS = 15;
const GRID_COLS = 35;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('boardElement') boardHTMLElement!: ElementRef;
  board: Board;
  score: number;
  selectedJewel: Jewel | null;

  constructor() {
    this.board = new Board(GRID_ROWS, GRID_COLS);
    this.score = this.board.getScore;
    this.selectedJewel = this.board.selectedJewel;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setBoardStyle(GRID_ROWS, GRID_COLS);
  }

  setBoardStyle(rows: number, columns: number): void {
    const boardElement: HTMLElement = this.boardHTMLElement.nativeElement;
    const rowsElement: HTMLCollection =
      this.boardHTMLElement.nativeElement.children;

    boardElement.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    for (let i = 0; i < rowsElement.length; i++) {
      const row = rowsElement[i] as HTMLElement;
      row.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    }
  }

  jewelMove(jewel: Jewel): void {
    if (this.board.selectedJewel) {
      if (this.board.selectedJewel === jewel) {
        this.board.selectedJewel = null
      } else {
        this.board.swapJewels(this.board.selectedJewel, jewel);
        this.score = this.board.getScore;
      }
    } else {
      this.board.selectedJewel = jewel;
    }

    this.selectedJewel = this.board.selectedJewel;
  }

  reset(): void {
    this.board.reset();
    this.score = this.board.getScore;
    setTimeout(() => {
      this.setBoardStyle(GRID_ROWS, GRID_COLS);
    }, 50);
  }
}
