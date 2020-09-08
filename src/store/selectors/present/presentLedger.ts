import {
  selector,
} from "recoil";

import {
  DEFAULT_LEDGER,
  PRESENT_LEDGER_SELECTOR_KEY,
} from "utils/Constants";
import {
  presentLedgersState,
} from "store/Atoms";

export const presentLedgerState = selector(
  {
    key: PRESENT_LEDGER_SELECTOR_KEY,
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
