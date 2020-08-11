import {
  HistoricalPrice as BrokenHistoricalPrice,
} from "iex-cloud";

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type HistoricalPrice = Overwrite<
  BrokenHistoricalPrice,
  {
    date: string;
  }
>;
