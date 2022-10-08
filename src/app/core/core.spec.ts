import { NullViewableError } from './game-error';
import { Core } from './core';
import { Row, Column, Cell, CellValue, Direction } from './map';
import { Viewable } from './viewable';
import { RandomTest } from './random-test';

class TestViewable implements Viewable {
  setCell(cell: Cell): void {}

  clickCell(row: Row, column: Column): void {}
}

describe('Game Core New Game', () => {
  const ROW_COUNT = 4;
  const COLUMN_COUNT = 4;
  let core: Core;
  let testingView: Viewable;
  let testingRandom: RandomTest;

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
    core.newGame(1);
    expect(testingView.setCell).toHaveBeenCalledTimes(16);
  });

  it('should show ordered grid for shuffleCount = 0', () => {
    core.setView(testingView);
    testingRandom.values = [Direction.RIGHT];
    core.newGame(0);
    const expectedValues = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
    ];
    for (let row = 0; row < ROW_COUNT; row++) {
      for (let col = 0; col < COLUMN_COUNT; col++) {
        const cell: Cell = {
          row: row as Row,
          column: col as Column,
          value: expectedValues[row][col] as CellValue,
        };
        expect(testingView.setCell).toHaveBeenCalledWith(cell);
      }
    }
  });

  it('should shuffle one cell to right', () => {
    core.setView(testingView);
    testingRandom.values = [Direction.RIGHT];
    testingRandom.valuesIndex = 0;
    core.newGame(testingRandom.values.length);
    const expectedValues = [
      [1, 0, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
    ];
    for (let row = 0; row < ROW_COUNT; row++) {
      for (let col = 0; col < COLUMN_COUNT; col++) {
        const cell: Cell = {
          row: row as Row,
          column: col as Column,
          value: expectedValues[row][col] as CellValue,
        };
        expect(testingView.setCell).toHaveBeenCalledWith(cell);
      }
    }
  });

  it('should not shuffle one cell to up', () => {
    core.setView(testingView);
    testingRandom.values = [Direction.UP];
    testingRandom.valuesIndex = 0;
    core.newGame(testingRandom.values.length);
    const expectedValues = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
    ];
    for (let row = 0; row < ROW_COUNT; row++) {
      for (let col = 0; col < COLUMN_COUNT; col++) {
        const cell: Cell = {
          row: row as Row,
          column: col as Column,
          value: expectedValues[row][col] as CellValue,
        };
        expect(testingView.setCell).toHaveBeenCalledWith(cell);
      }
    }
  });

  it('should shuffle two cells to down and right', () => {
    core.setView(testingView);
    testingRandom.values = [Direction.DOWN, Direction.RIGHT];
    testingRandom.valuesIndex = 0;
    core.newGame(testingRandom.values.length);
    const expectedValues = [
      [4, 1, 2, 3],
      [5, 0, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
    ];
    for (let row = 0; row < ROW_COUNT; row++) {
      for (let col = 0; col < COLUMN_COUNT; col++) {
        const cell: Cell = {
          row: row as Row,
          column: col as Column,
          value: expectedValues[row][col] as CellValue,
        };
        expect(testingView.setCell).toHaveBeenCalledWith(cell);
      }
    }
  });

  it('should shuffle four cells to down up right right', () => {
    core.setView(testingView);
    testingRandom.values = [
      Direction.DOWN,
      Direction.UP,
      Direction.RIGHT,
      Direction.RIGHT,
    ];
    testingRandom.valuesIndex = 0;
    core.newGame(testingRandom.values.length);
    const expectedValues = [
      [1, 2, 0, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
    ];
    for (let row = 0; row < ROW_COUNT; row++) {
      for (let col = 0; col < COLUMN_COUNT; col++) {
        const cell: Cell = {
          row: row as Row,
          column: col as Column,
          value: expectedValues[row][col] as CellValue,
        };
        expect(testingView.setCell).toHaveBeenCalledWith(cell);
      }
    }
  });

  it('should shuffle seven cells to down down left right up right down', () => {
    core.setView(testingView);
    testingRandom.values = [
      Direction.DOWN,
      Direction.DOWN,
      Direction.LEFT,
      Direction.RIGHT,
      Direction.UP,
      Direction.RIGHT,
      Direction.DOWN,
    ];
    testingRandom.valuesIndex = 0;
    core.newGame(testingRandom.values.length);
    const expectedValues = [
      [4, 1, 2, 3],
      [8, 6, 10, 7],
      [9, 5, 0, 11],
      [12, 13, 14, 15],
    ];
    for (let row = 0; row < ROW_COUNT; row++) {
      for (let col = 0; col < COLUMN_COUNT; col++) {
        const cell: Cell = {
          row: row as Row,
          column: col as Column,
          value: expectedValues[row][col] as CellValue,
        };
        expect(testingView.setCell).toHaveBeenCalledWith(cell);
      }
    }
  });

  it('should shuffle ten cells to up left right down down down down right right right', () => {
    core.setView(testingView);
    testingRandom.values = [
      Direction.UP,
      Direction.LEFT,
      Direction.RIGHT,
      Direction.DOWN,
      Direction.DOWN,
      Direction.DOWN,
      Direction.DOWN,
      Direction.RIGHT,
      Direction.RIGHT,
      Direction.RIGHT,
    ];
    testingRandom.valuesIndex = 0;
    core.newGame(testingRandom.values.length);
    const expectedValues = [
      [1, 5, 2, 3],
      [4, 9, 6, 7],
      [8, 13, 10, 11],
      [12, 14, 15, 0],
    ];
    for (let row = 0; row < ROW_COUNT; row++) {
      for (let col = 0; col < COLUMN_COUNT; col++) {
        const cell: Cell = {
          row: row as Row,
          column: col as Column,
          value: expectedValues[row][col] as CellValue,
        };
        expect(testingView.setCell).toHaveBeenCalledWith(cell);
      }
    }
  });
});

describe('Game Core Click Cell Throw Error', () => {
  let core: Core;
  let testingView: Viewable;
  let testingRandom: RandomTest;

  beforeEach(async () => {
    testingView = new TestViewable();
    testingRandom = new RandomTest();
    core = new Core(testingRandom);
    spyOn(testingView, 'setCell');
  });

  it('should throw NullViewableError', () => {
    expect(core.clickCell.bind(core, 1, 1)).toThrowError(NullViewableError);
  });
});

describe('Game Core Click Cell ShuffleCount = 0', () => {
  let core: Core;
  let testingView: Viewable;
  let testingRandom: RandomTest;
  let spy: any;

  beforeEach(async () => {
    testingView = new TestViewable();
    spy = spyOn(testingView, 'setCell');
    testingRandom = new RandomTest();
    core = new Core(testingRandom);
    core.setView(testingView);
    core.newGame(0);
    spy.calls.reset();
  });

  it('should not swap cell [1, 1] from [0, 0]', () => {
    core.clickCell(1, 1);
    expect(testingView.setCell).not.toHaveBeenCalled();
  });

  it('should not swap cell [3, 3] from [0, 0]', () => {
    core.clickCell(3, 3);
    expect(testingView.setCell).not.toHaveBeenCalled();
  });

  it('should not swap cell [0, 2] from [0, 0]', () => {
    core.clickCell(0, 2);
    expect(testingView.setCell).not.toHaveBeenCalled();
  });

  it('should not swap cell [3, 0] from [0, 0]', () => {
    core.clickCell(3, 0);
    expect(testingView.setCell).not.toHaveBeenCalled();
  });

  it('should swap cell [1, 0] from [0, 0]', () => {
    core.clickCell(1, 0);
    const newFreeCell: Cell = { row: 1, column: 0, value: 0 };
    const prevFreeCell: Cell = { row: 0, column: 0, value: 4 };
    expect(testingView.setCell).toHaveBeenCalledTimes(2);
    expect(testingView.setCell).toHaveBeenCalledWith(newFreeCell);
    expect(testingView.setCell).toHaveBeenCalledWith(prevFreeCell);
  });

  it('should swap cell [0, 1] from [0, 0]', () => {
    core.clickCell(0, 1);
    const newFreeCell: Cell = { row: 0, column: 1, value: 0 };
    const prevFreeCell: Cell = { row: 0, column: 0, value: 1 };
    expect(testingView.setCell).toHaveBeenCalledTimes(2);
    expect(testingView.setCell).toHaveBeenCalledWith(newFreeCell);
    expect(testingView.setCell).toHaveBeenCalledWith(prevFreeCell);
  });
});

describe('Game Core Click Cell ShuffleCount = 3', () => {
  let core: Core;
  let testingView: Viewable;
  let testingRandom: RandomTest;
  let spy: any;

  beforeEach(async () => {
    testingView = new TestViewable();
    spy = spyOn(testingView, 'setCell');
    testingRandom = new RandomTest();
    core = new Core(testingRandom);
    core.setView(testingView);
    testingRandom.values = [Direction.RIGHT, Direction.DOWN, Direction.RIGHT];
    testingRandom.valuesIndex = 0;
    core.newGame(testingRandom.values.length);
    spy.calls.reset();
  });

  it('should not swap cell [0, 0] from [1, 2]', () => {
    core.clickCell(0, 0);
    expect(testingView.setCell).not.toHaveBeenCalled();
  });

  it('should not swap cell [3, 3] from [1, 2]', () => {
    core.clickCell(3, 3);
    expect(testingView.setCell).not.toHaveBeenCalled();
  });

  it('should not swap cell [0, 3] from [1, 2]', () => {
    core.clickCell(0, 3);
    expect(testingView.setCell).not.toHaveBeenCalled();
  });

  it('should not swap cell [0, 1] from [1, 2]', () => {
    core.clickCell(0, 1);
    expect(testingView.setCell).not.toHaveBeenCalled();
  });

  it('should not swap cell [2, 3] from [1, 2]', () => {
    core.clickCell(2, 3);
    expect(testingView.setCell).not.toHaveBeenCalled();
  });

  it('should not swap cell [2, 1] from [1, 2]', () => {
    core.clickCell(2, 1);
    expect(testingView.setCell).not.toHaveBeenCalled();
  });

  it('should swap cell [2, 1] from [1, 2]', () => {
    core.clickCell(0, 2);
    const newFreeCell: Cell = { row: 0, column: 2, value: 0 };
    const prevFreeCell: Cell = { row: 1, column: 2, value: 2 };
    expect(testingView.setCell).toHaveBeenCalledTimes(2);
    expect(testingView.setCell).toHaveBeenCalledWith(newFreeCell);
    expect(testingView.setCell).toHaveBeenCalledWith(prevFreeCell);
  });

  it('should swap cell [1, 1] from [1, 2]', () => {
    core.clickCell(1, 1);
    const newFreeCell: Cell = { row: 1, column: 1, value: 0 };
    const prevFreeCell: Cell = { row: 1, column: 2, value: 6 };
    expect(testingView.setCell).toHaveBeenCalledTimes(2);
    expect(testingView.setCell).toHaveBeenCalledWith(newFreeCell);
    expect(testingView.setCell).toHaveBeenCalledWith(prevFreeCell);
  });

  it('should swap cell [1, 3] from [1, 2]', () => {
    core.clickCell(1, 3);
    const newFreeCell: Cell = { row: 1, column: 3, value: 0 };
    const prevFreeCell: Cell = { row: 1, column: 2, value: 7 };
    expect(testingView.setCell).toHaveBeenCalledTimes(2);
    expect(testingView.setCell).toHaveBeenCalledWith(newFreeCell);
    expect(testingView.setCell).toHaveBeenCalledWith(prevFreeCell);
  });

  it('should swap cell [3, 2] from [1, 2]', () => {
    core.clickCell(2, 2);
    const newFreeCell: Cell = { row: 2, column: 2, value: 0 };
    const prevFreeCell: Cell = { row: 1, column: 2, value: 10 };
    expect(testingView.setCell).toHaveBeenCalledTimes(2);
    expect(testingView.setCell).toHaveBeenCalledWith(newFreeCell);
    expect(testingView.setCell).toHaveBeenCalledWith(prevFreeCell);
  });
});
