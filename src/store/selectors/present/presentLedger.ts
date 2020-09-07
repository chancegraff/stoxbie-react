import {
  DefaultLedger,
} from "holding-types";
import {
  selector,
} from "recoil";

import {
  PRESENT_LEDGERS_STATE_KEY,
} from "utils/Constants";
import {
  presentLedgersState,
} from "store/Atoms";

export const presentLedgerState = selector(
  {
    key: PRESENT_LEDGERS_STATE_KEY,
    get: (
      {
        get,
      },
    ) =>
    {
      const presentLedgers = get(
        presentLedgersState,
      );

      return presentLedgers.first(
        DefaultLedger,
      );
    },
  },
);
