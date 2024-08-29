import { useCallback, useContext, useMemo, useState } from "react";
import { IPosition, Position } from "../../models/IPosition";
import { getPath } from "../../utils/getPath";
import { BoardContext, IBoard } from "../../contexts/BoardContext";
import { TActionValue } from "../../models/TAction";
import { BoardGrid } from "../BoardGrid";
import "./styles.css";

export const Board = ({ matrix }: BoardProps) => {
  const { value: state, onChange } = useContext(BoardContext);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isMoving, setIsMoving] = useState<boolean>(false);

  const setState = useCallback(
    (value: TActionValue<IBoard>) => {
      if (!isLocked) {
        onChange(value);
      }
    },
    [onChange, isLocked]
  );

  const handleOnClickCell = useCallback(
    (position: IPosition) => {
      if (!state.positionStart) {
        setState((prev) => ({ ...prev, positionStart: position }));
      } else {
        setIsLocked(true);
      }
    },
    [state.positionStart, setState]
  );

  const path = useMemo(() => {
    if (!state.positionStart || !state.positionEnd) {
      return [];
    }
    return getPath(matrix, state.positionStart, state.positionEnd).map(
      (position) => position.toString()
    );
  }, [state.positionStart, state.positionEnd]);

  const handleOnMouseOver = useCallback(
    (position: IPosition) => {
      if (state.positionStart) {
        setState((prev) => ({ ...prev, positionEnd: position }));
      }
    },
    [state.positionStart, setState]
  );

  const handleOnRemoveLock = useCallback(() => {
    setIsLocked(false);
  }, []);

  const handleOnMove = useCallback(() => {
    setIsMoving(true);
    const promise = new Promise<void>((resolve, _) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if (i < path.length) {
          const [x, y] = path[i].split("_").map(Number);
          onChange((prev) => ({
            ...prev,
            positionStart: new Position({ x, y }),
            positionEnd: i + 1 == path.length ? null : prev.positionEnd,
          }));
        } else {
          clearInterval(interval);
          resolve();
        }
      }, 700);
    });
    promise.then(() => {
      handleOnRemoveLock();
      setIsMoving(false);
    });
  }, [onChange, handleOnRemoveLock, path]);

  const isLockedControls = !isLocked || isMoving;

  return (
    <div className="board">
      <button disabled={isLockedControls} onClick={handleOnRemoveLock}>
        Change path
      </button>
      <button disabled={isLockedControls} onClick={handleOnMove}>
        Move
      </button>
      <BoardGrid
        matrix={matrix}
        onClick={handleOnClickCell}
        onMouseOver={handleOnMouseOver}
        path={path}
      />
    </div>
  );
};

interface BoardProps {
  matrix: number[][];
}
