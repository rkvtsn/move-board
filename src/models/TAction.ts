export type TAction<T> = (value: TActionValue<T>) => void;

export type TActionValue<T> = T | ((oldValue: T) => T);
