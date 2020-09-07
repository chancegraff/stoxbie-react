import {
  Ledger,
} from "holding-types";
import {
  List,
} from "immutable";
import {
  atom,
} from "recoil";

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
