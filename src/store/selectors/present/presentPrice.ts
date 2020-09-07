import {
  HistoricalPrice,
} from "@chancey/iex-cloud";
import {
  selector,
} from "recoil";

import {
  PRESENT_PRICES_STATE_KEY,
} from "utils/Constants";
import {
  presentPricesState,
} from "store/Atoms";

export const presentPriceState = selector(
  {
    key: PRESENT_PRICES_STATE_KEY,
    get: (
      {
        get,
      },
    ) =>
    {
      const presentPrices = get(
        presentPricesState,
      );

      return presentPrices.last<HistoricalPrice | undefined>();
    },
  },
);
