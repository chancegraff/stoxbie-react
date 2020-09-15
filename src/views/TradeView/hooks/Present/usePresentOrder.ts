import {
  useCallback,
} from "react";
import {
  useRecoilValue,
} from "recoil";
import {
  PresentOrderType,
} from "trade-types";

import {
  Amount,
  Balance,
  Direction,
} from "utils/Holdings";
import {
  presentPriceState,
} from "store/Selectors";

type PresentOrderHook = {
  PresentOrder: (amount: number) => PresentOrderType | undefined;
};

/**
 * @description Creates a new open order from amount and returns it
 * @returns {PresentOrderType | undefined} New open order
 */
export const usePresentOrder = (): PresentOrderHook =>
{
  const presentPrice = useRecoilValue(
    presentPriceState,
  );

  const PresentOrder = useCallback(
    (
      amount: number,
    ): PresentOrderType | undefined =>
    {
      if (!presentPrice)
      {
        return;
      }

      const {
        close: openPrice,
      } = presentPrice;

      return {
        amount: Amount(
          amount,
        ),
        balance: Balance(
          amount,
          openPrice,
        ),
        date: new Date(),
        direction: Direction(
          amount,
        ),
        price: openPrice,
      };
    },
    [
      presentPrice,
    ],
  );

  return {
    PresentOrder,
  };
};
