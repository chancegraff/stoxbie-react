import {
  List,
} from "immutable";
import {
  atom,
} from "recoil";
import {
  Ledger,
} from "trade-types";

import {
  HISTORICAL_LEDGERS_STATE_KEY,
} from "utils/Constants";

/**
 * @description All historical ledgers
 */
export const historicalLedgersState = atom<List<Ledger>>(
  {
    key: HISTORICAL_LEDGERS_STATE_KEY,
    default: List<Ledger>(),
  },
);
