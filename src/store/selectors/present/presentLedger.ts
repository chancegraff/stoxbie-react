import {
  selector,
} from "recoil";

import {
  DEFAULT_LEDGER,
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
        DEFAULT_LEDGER,
      );
    },
  },
);
