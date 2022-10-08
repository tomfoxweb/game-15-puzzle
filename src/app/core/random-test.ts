import { Randomable } from './randomable';

export class RandomTest implements Randomable {
  randomInteger(min: number, max: number): number {
    return min;
  }
}
