import { IPosition, Position } from "../models/IPosition";

const DIRS = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

export const getPath = (
  matrix: number[][],
  start: IPosition,
  end: IPosition
): IPosition[] => {
  const queue: Position[][] = [[new Position(start)]];
  const visited = new Set<string>();
  if (matrix[start.x][start.y] == 0 || matrix[end.x][end.y] == 0) {
    return [];
  }
  if (new Position(start).toString() === new Position(end).toString()) {
    return [new Position(start)];
  }
  while (queue.length > 0) {
    const path = queue.shift()!;
    const position = path[path.length - 1];
    const { x, y } = position;
    const key = position.toString();

    if (!visited.has(key)) {
      visited.add(key);
      for (const [x2, y2] of DIRS) {
        const x1 = x + x2;
        const y1 = y + y2;
        if (x1 == end.x && y1 == end.y) {
          return path.concat([new Position(end)]);
        }

        if (x1 >= 0 && x1 < matrix.length && y1 >= 0 && y1 < matrix[0].length) {
          if (matrix[x1][y1] == 0) {
            continue;
          }
          queue.push(path.concat([new Position({ x: x1, y: y1 })]));
        }
      }
    }
  }
  return [];
};
