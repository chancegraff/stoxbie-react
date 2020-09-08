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
  PRESENT_LEDGERS_STATE_KEY,
} from "utils/Constants";

/**
 * @description All present ledgers
 */
export const presentLedgersState = atom<List<Ledger>>(
  {
    key: PRESENT_LEDGERS_STATE_KEY,
    default: List<Ledger>(),
  },
);
