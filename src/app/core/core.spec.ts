import { NullViewableError } from './game-error';
import { Core } from './core';
import { Row, Column, Cell, CellValue, Direction } from './map';
import { Viewable } from './viewable';
import { RandomTest } from './random-test';

class TestViewable implements Viewable {
  setCell(cell: Cell): void {}

  clickCell(row: Row, column: Column): void {}

  finishGame(): void {}
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
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 0],
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

  it('should shuffle one cell to left', () => {
    core.setView(testingView);
    testingRandom.values = [Direction.LEFT];
    testingRandom.valuesIndex = 0;
    core.newGame(testingRandom.values.length);
    const expectedValues = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 0, 15],
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
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 0],
      [13, 14, 15, 12],
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

  it('should shuffle two cells to up and left', () => {
    core.setView(testingView);
    testingRandom.values = [Direction.UP, Direction.LEFT];
    testingRandom.valuesIndex = 0;
    core.newGame(testingRandom.values.length);
    const expectedValues = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 0, 11],
      [13, 14, 15, 12],
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

  it('should shuffle four cells to up down left left', () => {
    core.setView(testingView);
    testingRandom.values = [
      Direction.UP,
      Direction.DOWN,
      Direction.LEFT,
      Direction.LEFT,
    ];
    testingRandom.valuesIndex = 0;
    core.newGame(testingRandom.values.length);
    const expectedValues = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 0, 14, 15],
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

  it('should shuffle seven cells to up up right left down left up', () => {
    core.setView(testingView);
    testingRandom.values = [
      Direction.UP,
      Direction.UP,
      Direction.RIGHT,
      Direction.LEFT,
      Direction.DOWN,
      Direction.LEFT,
      Direction.UP,
    ];
    testingRandom.valuesIndex = 0;
    core.newGame(testingRandom.values.length);
    const expectedValues = [
      [1, 2, 3, 4],
      [5, 0, 11, 7],
      [9, 6, 10, 8],
      [13, 14, 15, 12],
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

  it('should shuffle ten cells to down right left up up up up left left left', () => {
    core.setView(testingView);
    testingRandom.values = [
      Direction.DOWN,
      Direction.RIGHT,
      Direction.LEFT,
      Direction.UP,
      Direction.UP,
      Direction.UP,
      Direction.UP,
      Direction.LEFT,
      Direction.LEFT,
      Direction.LEFT,
    ];
    testingRandom.valuesIndex = 0;
    core.newGame(testingRandom.values.length);
    const expectedValues = [
      [0, 1, 2, 4],
      [5, 6, 3, 8],
      [9, 10, 7, 12],
      [13, 14, 11, 15],
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

  it('should not swap cell [2, 2] from [3, 3]', () => {
    core.clickCell(2, 2);
    expect(testingView.setCell).not.toHaveBeenCalled();
  });

  it('should not swap cell [0, 0] from [3, 3]', () => {
    core.clickCell(0, 0);
    expect(testingView.setCell).not.toHaveBeenCalled();
  });

  it('should not swap cell [0, 2] from [3, 3]', () => {
    core.clickCell(0, 2);
    expect(testingView.setCell).not.toHaveBeenCalled();
  });

  it('should not swap cell [0, 3] from [3, 3]', () => {
    core.clickCell(0, 3);
    expect(testingView.setCell).not.toHaveBeenCalled();
  });

  it('should swap cell [3, 2] from [3, 3]', () => {
    core.clickCell(3, 2);
    const newFreeCell: Cell = { row: 3, column: 2, value: 0 };
    const prevFreeCell: Cell = { row: 3, column: 3, value: 15 };
    expect(testingView.setCell).toHaveBeenCalledTimes(2);
    expect(testingView.setCell).toHaveBeenCalledWith(newFreeCell);
    expect(testingView.setCell).toHaveBeenCalledWith(prevFreeCell);
  });

  it('should swap cell [2, 3] from [3, 3]', () => {
    core.clickCell(2, 3);
    const newFreeCell: Cell = { row: 2, column: 3, value: 0 };
    const prevFreeCell: Cell = { row: 3, column: 3, value: 12 };
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
    testingRandom.values = [Direction.LEFT, Direction.UP, Direction.LEFT];
    testingRandom.valuesIndex = 0;
    core.newGame(testingRandom.values.length);
    spy.calls.reset();
  });

  it('should not swap cell [3, 3] from [2, 1]', () => {
    core.clickCell(3, 3);
    expect(testingView.setCell).not.toHaveBeenCalled();
  });

  it('should not swap cell [0, 0] from [2, 1]', () => {
    core.clickCell(0, 0);
    expect(testingView.setCell).not.toHaveBeenCalled();
  });

  it('should not swap cell [3, 0] from [2, 1]', () => {
    core.clickCell(3, 0);
    expect(testingView.setCell).not.toHaveBeenCalled();
  });

  it('should not swap cell [0, 1] from [2, 1]', () => {
    core.clickCell(1, 0);
    expect(testingView.setCell).not.toHaveBeenCalled();
  });

  it('should not swap cell [1, 2] from [2, 1]', () => {
    core.clickCell(1, 2);
    expect(testingView.setCell).not.toHaveBeenCalled();
  });

  it('should not swap cell [3, 0] from [2, 1]', () => {
    core.clickCell(3, 0);
    expect(testingView.setCell).not.toHaveBeenCalled();
  });

  it('should swap cell [1, 1] from [2, 1]', () => {
    core.clickCell(1, 1);
    const newFreeCell: Cell = { row: 1, column: 1, value: 0 };
    const prevFreeCell: Cell = { row: 2, column: 1, value: 6 };
    expect(testingView.setCell).toHaveBeenCalledTimes(2);
    expect(testingView.setCell).toHaveBeenCalledWith(newFreeCell);
    expect(testingView.setCell).toHaveBeenCalledWith(prevFreeCell);
  });

  it('should swap cell [2, 2] from [2, 1]', () => {
    core.clickCell(2, 2);
    const newFreeCell: Cell = { row: 2, column: 2, value: 0 };
    const prevFreeCell: Cell = { row: 2, column: 1, value: 10 };
    expect(testingView.setCell).toHaveBeenCalledTimes(2);
    expect(testingView.setCell).toHaveBeenCalledWith(newFreeCell);
    expect(testingView.setCell).toHaveBeenCalledWith(prevFreeCell);
  });

  it('should swap cell [3, 1] from [2, 1]', () => {
    core.clickCell(3, 1);
    const newFreeCell: Cell = { row: 3, column: 1, value: 0 };
    const prevFreeCell: Cell = { row: 2, column: 1, value: 14 };
    expect(testingView.setCell).toHaveBeenCalledTimes(2);
    expect(testingView.setCell).toHaveBeenCalledWith(newFreeCell);
    expect(testingView.setCell).toHaveBeenCalledWith(prevFreeCell);
  });

  it('should swap cell [2, 0] from [1, 2]', () => {
    core.clickCell(2, 0);
    const newFreeCell: Cell = { row: 2, column: 0, value: 0 };
    const prevFreeCell: Cell = { row: 2, column: 1, value: 9 };
    expect(testingView.setCell).toHaveBeenCalledTimes(2);
    expect(testingView.setCell).toHaveBeenCalledWith(newFreeCell);
    expect(testingView.setCell).toHaveBeenCalledWith(prevFreeCell);
  });
});

describe('Game Core Finish Game ShuffleCount = 0', () => {
  let core: Core;
  let testingView: Viewable;
  let testingRandom: RandomTest;
  let spySetCell: any;
  let spyFinishGame: any;

  beforeEach(async () => {
    testingView = new TestViewable();
    spySetCell = spyOn(testingView, 'setCell');
    spyFinishGame = spyOn(testingView, 'finishGame');
    testingRandom = new RandomTest();
    core = new Core(testingRandom);
    core.setView(testingView);
    testingRandom.values = [];
    testingRandom.valuesIndex = 0;
    core.newGame(testingRandom.values.length);
    spySetCell.calls.reset();
  });

  it('should finish game after click row 3 column 2', () => {
    core.clickCell(3, 2);
    let newFreeCell: Cell = { row: 3, column: 2, value: 0 };
    let prevFreeCell: Cell = { row: 3, column: 3, value: 15 };
    expect(testingView.setCell).toHaveBeenCalledTimes(2);
    expect(testingView.setCell).toHaveBeenCalledWith(newFreeCell);
    expect(testingView.setCell).toHaveBeenCalledWith(prevFreeCell);
    spySetCell.calls.reset();
    core.clickCell(3, 3);
    newFreeCell = { row: 3, column: 3, value: 0 };
    prevFreeCell = { row: 3, column: 2, value: 15 };
    expect(testingView.setCell).toHaveBeenCalledTimes(2);
    expect(testingView.setCell).toHaveBeenCalledWith(newFreeCell);
    expect(testingView.setCell).toHaveBeenCalledWith(prevFreeCell);
    expect(testingView.finishGame).toHaveBeenCalled();
  });

  it('should finish game after clicks on column 3 up', () => {
    core.clickCell(2, 3);
    core.clickCell(1, 3);
    core.clickCell(0, 3);
    core.clickCell(1, 3);
    core.clickCell(2, 3);
    core.clickCell(3, 3);
    expect(testingView.finishGame).toHaveBeenCalled();
  });

  it('should finish game after clicks on row 3 left', () => {
    core.clickCell(3, 2);
    core.clickCell(3, 1);
    core.clickCell(3, 0);
    core.clickCell(3, 1);
    core.clickCell(3, 2);
    core.clickCell(3, 3);
    expect(testingView.finishGame).toHaveBeenCalled();
  });
});

describe('Game Core Finish Game ShuffleCount = 5', () => {
  let core: Core;
  let testingView: Viewable;
  let testingRandom: RandomTest;
  let spyFinishGame: any;

  beforeEach(async () => {
    testingView = new TestViewable();
    spyFinishGame = spyOn(testingView, 'finishGame');
    testingRandom = new RandomTest();
    core = new Core(testingRandom);
    core.setView(testingView);
    testingRandom.values = [
      Direction.LEFT,
      Direction.UP,
      Direction.LEFT,
      Direction.UP,
      Direction.RIGHT,
    ];
    testingRandom.valuesIndex = 0;
    core.newGame(testingRandom.values.length);
  });

  it('should finish game after backward clicks', () => {
    core.clickCell(1, 1);
    core.clickCell(2, 1);
    core.clickCell(2, 2);
    core.clickCell(3, 2);
    core.clickCell(3, 3);
    expect(testingView.finishGame).toHaveBeenCalled();
  });
});
