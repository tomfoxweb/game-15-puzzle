import { Viewable } from './viewable';

export interface Modellable {
  setView(view: Viewable): void;
  newGame(): void;
}
