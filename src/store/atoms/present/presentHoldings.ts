import {
  PresentHoldingType,
} from "holding-types";
import {
  List,
} from "immutable";
import {
  atom,
} from "recoil";

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
