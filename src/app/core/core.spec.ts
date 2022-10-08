import { NullViewableError } from './game-error';
import { Core } from './core';
import { Row, Column, Cell, CellValue } from './map';
import { Viewable } from './viewable';
import { Randomable } from './randomable';
import { RandomTest } from './random-test';

class TestViewable implements Viewable {
  setCell(cell: Cell): void {}
}

describe('Game Core', () => {
  const ROW_COUNT = 4;
  const COLUMN_COUNT = 4;
  let core: Core;
  let testingView: Viewable;
  let testingRandom: Randomable;

  beforeEach(async () => {
    testingView = new TestViewable();
    testingRandom = new RandomTest();
    core = new Core(testingRandom);
    spyOn(testingView, 'setCell');
  });

  it('should throw NullViewError in newGame if view === null', () => {
    expect(core.newGame.bind(core)).toThrowError(NullViewableError);
  });

  it('should call 16 view.setCell methods in newGame method', () => {
    core.setView(testingView);
    core.newGame();
    expect(testingView.setCell).toHaveBeenCalledTimes(16);
  });

  it('should set all Row Column Cells in newGame method', () => {
    core.setView(testingView);
    core.newGame();
    let value = 0;
    for (let row = 0; row < ROW_COUNT; row++) {
      for (let col = 0; col < COLUMN_COUNT; col++) {
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
