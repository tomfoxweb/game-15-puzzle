export type CellValue =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15;
export type Row = 0 | 1 | 2 | 3;
export type Column = 0 | 1 | 2 | 3;

export interface Cell {
  row: Row;
  column: Column;
  value: CellValue;
}
