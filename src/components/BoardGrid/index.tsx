import { useContext } from "react";
import { IPosition } from "../../models/IPosition";
import { Cell } from "../Cell";
import { BoardContext } from "../../contexts/BoardContext";

export const BoardGrid = ({
  matrix,
  onMouseOver,
  onClick,
  path,
}: BoardGridProps) => {
  const { value: state } = useContext(BoardContext);

  return (
    <div className="board__grid">
      {matrix.map((row, rowIndex) => (
        <div className="row d-flex" key={rowIndex}>
          {row.map((col, colIndex) => (
            <Cell
              value={col}
              onMouseOver={onMouseOver}
              onClick={onClick}
              x={rowIndex}
              y={colIndex}
              isStart={
                !!state.positionStart &&
                rowIndex == state.positionStart.x &&
                colIndex == state.positionStart.y
              }
              isEnd={
                !!state.positionEnd &&
                rowIndex == state.positionEnd.x &&
                colIndex == state.positionEnd.y
              }
              isPath={col != 0 && path.includes(`${rowIndex}_${colIndex}`)}
              key={`${rowIndex}_${colIndex}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export interface BoardGridProps {
  matrix: number[][];
  path: string[];
  onMouseOver: (position: IPosition) => void;
  onClick: (position: IPosition) => void;
}
