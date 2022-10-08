import { NullViewableError } from './game-error';
import { Modellable } from './modellable';
import {
  Cell,
  CellValues,
  ColumnValues,
  COLUMN_COUNT,
  Direction,
  RowValues,
  ROW_COUNT,
} from './map';
import { Viewable } from './viewable';
import { Randomable } from './randomable';

export class Core implements Modellable {
  private view: Viewable | undefined = undefined;
  private randomizer: Randomable;
  private grid: Cell[][] = [];

  constructor(randomizer: Randomable) {
    this.randomizer = randomizer;
    this.initGrid();
  }

  setView(view: Viewable): void {
    this.view = view;
  }

  newGame(shuffleCount: number): void {
    if (this.view === undefined) {
      throw new NullViewableError();
    }
    this.orderGrid();
    this.shuffleGrid(shuffleCount);
    this.showGrid();
  }

  private initGrid(): void {
    const valueIterator = CellValues[Symbol.iterator]();
    for (const row of RowValues) {
      this.grid.push([]);
      for (const column of ColumnValues) {
        const value = valueIterator.next().value;
        const cell: Cell = { row, column, value };
        this.grid[row].push(cell);
      }
    }
  }

  private orderGrid(): void {
    const valueIterator = CellValues[Symbol.iterator]();
    for (const row of RowValues) {
      for (const column of ColumnValues) {
        const value = valueIterator.next().value;
        const cell: Cell = { row, column, value };
        this.grid[row][column] = cell;
      }
    }
  }

  private shuffleGrid(shuffleCount: number): void {
    let freeCell: Cell = { row: 0, column: 0, value: 0 };
    const f = new Map<number, number>();
    for (let i = 0; i < shuffleCount; i++) {
      const direction = this.randomizer.randomInteger(0, 3) as Direction;
      freeCell = this.moveCell(freeCell, direction);
    }
  }

  private moveCell(cell: Cell, direction: Direction): Cell {
    if (!this.isSwappawableDirection(cell, direction)) {
      return cell;
    }
    let aCell = { ...cell };
    let bCell = { ...cell };
    switch (direction) {
      case Direction.UP:
        bCell.row--;
        break;
      case Direction.RIGHT:
        bCell.column++;
        break;
      case Direction.DOWN:
        bCell.row++;
        break;
      case Direction.LEFT:
        bCell.column--;
        break;
    }
    bCell.value = this.grid[bCell.row][bCell.column].value;

    this.grid[aCell.row][aCell.column].value = bCell.value;
    this.grid[bCell.row][bCell.column].value = aCell.value;

    bCell.value = aCell.value;

    return bCell;
  }

  private isSwappawableDirection(cell: Cell, dir: Direction): boolean {
    if (dir === Direction.UP && cell.row === 0) {
      return false;
    } else if (dir === Direction.RIGHT && cell.column === COLUMN_COUNT - 1) {
      return false;
    } else if (dir === Direction.DOWN && cell.row === ROW_COUNT - 1) {
      return false;
    } else if (dir === Direction.LEFT && cell.column === 0) {
      return false;
    }
    return true;
  }

  private showGrid(): void {
    for (const row of RowValues) {
      for (const column of ColumnValues) {
        const value = this.grid[row][column].value;
        const cell: Cell = { row, column, value };
        this.view?.setCell(cell);
      }
    }
  }
}
