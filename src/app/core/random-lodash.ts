import { Randomable } from './randomable';
import * as Lodash from 'lodash';

export class RandomLodash implements Randomable {
  randomInteger(min: number, max: number): number {
    return Lodash.random(min, max);
  }
}
