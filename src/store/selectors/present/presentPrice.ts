import {
  selector,
} from "recoil";

import {
  PRESENT_PRICE_SELECTOR_KEY,
} from "utils/Constants";
import {
  presentPricesState,
} from "store/Atoms";

export const presentPriceState = selector(
  {
    key: PRESENT_PRICE_SELECTOR_KEY,
    get: (
      {
        get,
      },
    ) =>
    {
      const presentPrices = get(
        presentPricesState,
      );

      return presentPrices.last<undefined>();
    },
  },
);
