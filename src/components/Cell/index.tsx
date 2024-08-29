import { PropsWithChildren, useCallback } from "react";
import { IPosition } from "../../models/IPosition";
import "./styles.css";

const CLASSES = ["wall", "empty", "forest"];

export const Cell = ({
  children,
  isEnd,
  isStart,
  isPath,
  x,
  y,
  onClick,
  onMouseOver,
  value,
}: CellProps) => {
  const handleOnClick = useCallback(() => {
    if (value == 0) {
      return;
    }
    onClick && onClick({ x, y });
  }, [onClick, x, y]);

  const handleOnMouseOver = useCallback(() => {
    onMouseOver && onMouseOver({ x, y });
  }, [onClick, x, y]);

  const endClass = isEnd ? "cell--end" : "";
  const startClass = isStart ? "cell--start" : "";
  const pathClass = isPath ? "cell--path" : "";
  const typeClass = `cell cell--${CLASSES[value]}`;
  return (
    <div
      className={`cell ${typeClass} ${endClass} ${startClass}`}
      onClick={handleOnClick}
      onMouseOver={handleOnMouseOver}
    >
      {!isEnd && !isStart && isPath && <div className={pathClass}></div>}
      {value === 0 && <div className="cell-wall"></div>}
      {children}
    </div>
  );
};

interface CellProps extends PropsWithChildren, IPosition {
  onClick?: (position: IPosition) => void;
  onMouseOver?: (position: IPosition) => void;
  isEnd: boolean;
  isStart: boolean;
  isPath: boolean;
  value: number;
}
