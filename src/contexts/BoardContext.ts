import { createContext } from "react";
import { IPosition } from "../models/IPosition";
import { ActionProps } from "../models/ActionProps";

export interface IBoard {
  positionStart: IPosition | null;
  positionEnd: IPosition | null;
  path: IPosition[];
}

export const BOARD_STATE: IBoard = {
  positionStart: null,
  positionEnd: null,
  path: [],
};

export const BoardContext = createContext<ActionProps<IBoard>>({
  value: BOARD_STATE,
  onChange: () => {},
});
