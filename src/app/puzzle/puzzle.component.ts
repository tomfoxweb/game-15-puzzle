import { Component, OnInit } from '@angular/core';
import { Core } from '../core/core';
import { Cell, CellValue, Column, Row } from '../core/map';
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
    let value = 0;
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        this.puzzleItems.push({
          row: row as Row,
          column: col as Column,
          value: value as CellValue,
        });
        value++;
      }
    }
    this.core.newGame();
  }

  setCell(cell: Readonly<Cell>): void {
    const index = cell.row * Core.ROW_COUNT + cell.column;
    this.puzzleItems[index] = cell;
  }
}
