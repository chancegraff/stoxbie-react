import {
  selector,
} from "recoil";

import {
  PRESENT_HOLDINGS_STATE_KEY,
} from "utils/Constants";
import {
  presentHoldingsState,
} from "store/Atoms";

export const highestPresentHoldingState = selector(
  {
    key: PRESENT_HOLDINGS_STATE_KEY,
    get: (
      {
        get,
      },
    ) =>
    {
      const presentHoldings = get(
        presentHoldingsState,
      );

      return presentHoldings.maxBy(
        (
          holding,
        ) =>
        {
          return holding.orders.present.price;
        },
      );
    },
  },
);
