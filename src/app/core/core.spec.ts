import { Core } from './core';
import { Row, Column, Cell, CellValue } from './map';
import { Viewable } from './viewable';

class TestViewable implements Viewable {
  setCell(cell: Cell): void {}
}

describe('Game Core', () => {
  const ROW_COUNT = 4;
  const COLUMN_COUNT = 4;
  let core: Core;
  let testingView: Viewable;

  beforeEach(async () => {
    testingView = new TestViewable();
    core = new Core(testingView);
    spyOn(testingView, 'setCell');
  });

  it('should has ROW_COUNT public property equal 4', () => {
    expect(Core.ROW_COUNT).toEqual(ROW_COUNT);
  });

  it('should has COLUMN_COUNT public property equal 4', () => {
    expect(Core.COLUMN_COUNT).toEqual(COLUMN_COUNT);
  });

  it('should call 16 view.setCell methods in newGame method', () => {
    core.newGame();
    expect(testingView.setCell).toHaveBeenCalledTimes(16);
  });

  it('should set all Row Column Cells in newGame method', () => {
    core.newGame();
    let value = 0;
    for (let row: Row = 0; row < ROW_COUNT; row++) {
      for (let col: Column = 0; col < COLUMN_COUNT; col++) {
        const cell: Cell = {
          row: row as Row,
          column: col as Column,
          value: value as CellValue,
        };
        expect(testingView.setCell).toHaveBeenCalledWith(cell);
        value++;
      }
    }
  });
});
