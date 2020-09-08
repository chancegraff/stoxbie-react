import {
  selector,
} from "recoil";

import {
  PRESENT_HOLDING_SELECTOR_KEY,
} from "utils/Constants";
import {
  presentHoldingsState,
} from "store/Atoms";

export const presentHoldingState = selector(
  {
    key: PRESENT_HOLDING_SELECTOR_KEY,
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
