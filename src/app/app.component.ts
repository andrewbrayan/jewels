import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Board } from './board/board.class';
import { Jewel } from './jewel/jewel.class';

const GRID_ROWS = 8;
const GRID_COLS = 20;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('board') boardHTMLElement!: ElementRef;
  grid: any[][];
  board: Board = new Board(GRID_ROWS, GRID_COLS);
  score: number;
  jewelOneSelected: Jewel | null = null;
  jewelTwoSelected: Jewel | null = null;

  constructor() {
    this.grid = this.board.grid;
    this.score = this.board.score;
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
    if (this.jewelOneSelected) {
      this.jewelTwoSelected = jewel;
      if (this.jewelOneSelected.color != this.jewelTwoSelected.color) {
        this.board.moveJewel(this.jewelOneSelected, this.jewelTwoSelected);
        this.board.detectAndRemoveMatches(this.jewelOneSelected, this.jewelTwoSelected);
      };

      this.score = this.board.score;
      this.jewelTwoSelected = null;
      this.jewelOneSelected = null;
    } else {
      this.jewelOneSelected = jewel;
    }
  }

  reset(): void {
    this.board.reset();
    this.score = this.board.score;
    setTimeout(() => {
      this.setBoardStyle(GRID_ROWS, GRID_COLS);
    }, 50);
  }
}
