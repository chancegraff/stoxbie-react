import {
  List,
} from "immutable";
import {
  atom,
} from "recoil";
import {
  PresentHoldingType,
} from "trade-types";

import {
  PRESENT_HOLDINGS_STATE_KEY,
} from "utils/Constants";

/**
 * @description All present holdings
 */
export const presentHoldingsState = atom<List<PresentHoldingType>>(
  {
    key: PRESENT_HOLDINGS_STATE_KEY,
    default: List<PresentHoldingType>(),
  },
);
