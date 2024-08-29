import { TAction } from "./TAction";

export interface ActionProps<T> {
  value: T;
  onChange: TAction<T>;
}
