import { Randomable } from './randomable';

export class RandomTest implements Randomable {
  values: number[] = [];
  valuesIndex: number = 0;

  randomInteger(min: number, max: number): number {
    return this.values[this.valuesIndex++];
  }
}
