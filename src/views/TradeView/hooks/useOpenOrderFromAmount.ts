import {
  useCallback,
} from "react";
import {
  Amount,
  Balance,
  Direction,
  OpenedHolding,
  OpenOrder,
} from "holding-types";
import {
  useRecoilValue,
} from "recoil";

import {
  presentPriceState,
} from "store/Selectors";

type OpenOrderFromAmountHook = {
  openOrderFromAmount: (amount: number) => OpenOrder | undefined;
};

/**
 * @description Creates a new open order from amount and returns it
 * @returns {OpenOrder | undefined} New open order
 */
export const useOpenOrderFromAmount = (): OpenOrderFromAmountHook =>
{
  const presentPrice = useRecoilValue(
    presentPriceState,
  );

  const openOrderFromAmount = useCallback(
    (
      amount: number,
    ): OpenOrder | undefined =>
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
    openOrderFromAmount,
  };
};
