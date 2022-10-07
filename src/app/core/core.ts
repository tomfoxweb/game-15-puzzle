import {
  Cell,
  CellValue,
  CellValues,
  Column,
  ColumnValues,
  Row,
  RowValues,
} from './map';
import { Viewable } from './viewable';

export class Core {
  private view: Viewable;

  constructor(view: Viewable) {
    this.view = view;
  }

  newGame(): void {
    const valueIterator = CellValues[Symbol.iterator]();
    for (const row of RowValues) {
      for (const column of ColumnValues) {
        const value = valueIterator.next().value;
        const cell: Cell = { row, column, value };
        this.view.setCell(cell);
      }
    }
  }
}
