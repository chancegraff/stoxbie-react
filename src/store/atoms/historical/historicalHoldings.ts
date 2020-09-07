import {
  HistoricalHoldingType,
} from "holding-types";
import {
  List,
} from "immutable";
import {
  atom,
} from "recoil";

import {
  HISTORICAL_HOLDINGS_STATE_KEY,
} from "utils/Constants";

/**
 * @description All historical holdings
 */
export const historicalHoldingsState = atom<List<HistoricalHoldingType>>(
  {
    key: HISTORICAL_HOLDINGS_STATE_KEY,
    default: List<HistoricalHoldingType>(),
  },
);
