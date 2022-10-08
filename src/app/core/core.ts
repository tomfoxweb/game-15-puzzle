import { NullViewableError } from './game-error';
import { Modellable } from './modellable';
import { Cell, CellValues, ColumnValues, RowValues } from './map';
import { Viewable } from './viewable';
import { Randomable } from './randomable';

export class Core implements Modellable {
  private view: Viewable | undefined = undefined;
  private randomizer: Randomable;

  constructor(randomizer: Randomable) {
    this.randomizer = randomizer;
  }

  setView(view: Viewable): void {
    this.view = view;
  }

  newGame(): void {
    if (this.view === undefined) {
      throw new NullViewableError();
    }
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
