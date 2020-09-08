import {
  List,
} from "immutable";
import {
  atom,
} from "recoil";
import {
  HistoricalHolding,
} from "trade-types";

import {
  HISTORICAL_HOLDINGS_STATE_KEY,
} from "utils/Constants";

/**
 * @description All historical holdings
 */
export const historicalHoldingsState = atom<List<HistoricalHolding>>(
  {
    key: HISTORICAL_HOLDINGS_STATE_KEY,
    default: List<HistoricalHolding>(),
  },
);
