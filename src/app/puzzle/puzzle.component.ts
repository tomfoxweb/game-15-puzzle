import { Component, OnInit } from '@angular/core';
import { ControllerService } from '../controller.service';
import {
  Cell,
  CellValues,
  ColumnValues,
  positionToIndex,
  RowValues,
} from '../core/map';
import { Viewable } from '../core/viewable';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss'],
})
export class PuzzleComponent implements OnInit, Viewable {
  puzzleItems: Cell[] = [];

  constructor(public controller: ControllerService) {}

  ngOnInit(): void {
    const valueIterator = CellValues[Symbol.iterator]();
    for (const row of RowValues) {
      for (const column of ColumnValues) {
        const value = valueIterator.next().value;
        const cell: Cell = { row, column, value };
        this.puzzleItems.push(cell);
      }
    }
    this.controller.setView(this);
    this.controller.newGame();
  }

  newGame(): void {
    this.controller.newGame();
  }

  setCell(cell: Readonly<Cell>): void {
    const index = positionToIndex(cell.row, cell.column);
    this.puzzleItems[index] = cell;
  }
}
