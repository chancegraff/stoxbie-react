import {
  HistoricalPrice,
} from "@chancey/iex-cloud";
import {
  List,
} from "immutable";
import {
  atom,
} from "recoil";

import {
  HISTORICAL_PRICES_STATE_KEY,
} from "utils/Constants";

/**
 * @description All historical prices
 */
export const historicalPricesState = atom<List<HistoricalPrice>>(
  {
    key: HISTORICAL_PRICES_STATE_KEY,
    default: List<HistoricalPrice>(),
  },
);
