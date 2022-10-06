import { Cell } from './map';

export interface Viewable {
  setCell(cell: Readonly<Cell>): void;
}
