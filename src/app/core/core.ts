import { Cell, CellValue, Column, Row } from './map';
import { Viewable } from './viewable';

export class Core {
  public static readonly ROW_COUNT = 4;
  public static readonly COLUMN_COUNT = 4;
  private view: Viewable;

  constructor(view: Viewable) {
    this.view = view;
  }

  newGame(): void {
    let value = 0;
    for (let row: Row = 0; row < Core.ROW_COUNT; row++) {
      for (let column: Column = 0; column < Core.COLUMN_COUNT; column++) {
        const cell: Cell = {
          row: row as Row,
          column: column as Column,
          value: value as CellValue,
        };
        this.view.setCell(cell);
        value++;
      }
    }
  }
}
