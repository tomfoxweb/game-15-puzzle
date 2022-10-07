import { Component, OnInit } from '@angular/core';
import { Core } from '../core/core';
import { Cell, ColumnValues, positionToIndex, RowValues } from '../core/map';
import { Viewable } from '../core/viewable';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss'],
})
export class PuzzleComponent implements OnInit, Viewable {
  puzzleItems: Cell[] = [];
  private core: Core;

  constructor() {
    this.core = new Core(this);
  }

  ngOnInit(): void {
    for (const row of RowValues) {
      for (const column of ColumnValues) {
        const cell: Cell = { row, column, value: 0 };
        this.puzzleItems.push(cell);
      }
    }
    this.core.newGame();
  }

  setCell(cell: Readonly<Cell>): void {
    const index = positionToIndex(cell.row, cell.column);
    this.puzzleItems[index] = cell;
  }
}
