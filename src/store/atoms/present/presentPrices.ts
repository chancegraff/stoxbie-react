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
  PRESENT_PRICES_STATE_KEY,
} from "utils/Constants";

/**
 * @description All present prices
 */
export const presentPricesState = atom<List<HistoricalPrice>>(
  {
    key: PRESENT_PRICES_STATE_KEY,
    default: List<HistoricalPrice>(),
  },
);
