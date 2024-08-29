export interface IPosition {
  x: number;
  y: number;
}

export class Position implements IPosition {
  x: number;
  y: number;

  constructor({ x, y }: IPosition) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `${this.x}_${this.y}`;
  }
}
