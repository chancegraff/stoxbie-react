import {
  useCallback,
} from "react";
import {
  useRecoilValue,
} from "recoil";
import {
  HistoricalOrderType,
  PresentOrderType,
} from "trade-types";

import {
  Amount,
  Balance,
  OppositeDirection,
} from "utils/Holdings";
import {
  presentPriceState,
} from "store/Selectors";

type HistoricalOrderHook = {
  HistoricalOrder: (present: PresentOrderType) => HistoricalOrderType | undefined;
};

/**
 * @description Creates a new closed order from present holding and returns it
 * @returns {HistoricalOrderType | undefined} New closed order
 */
export const useHistoricalOrder = (): HistoricalOrderHook =>
{
  const presentPrice = useRecoilValue(
    presentPriceState,
  );

  const HistoricalOrder = useCallback(
    (
      present: PresentOrderType,
    ): HistoricalOrderType | undefined =>
    {
      if (!presentPrice)
      {
        return;
      }

      const {
        close: closePrice,
      } = presentPrice;

      return {
        amount: Amount(
          present.amount,
        ),
        balance: Balance(
          present.amount,
          closePrice,
        ),
        date: new Date(),
        direction: OppositeDirection(
          present.direction,
        ),
        price: closePrice,
      };
    },
    [
      presentPrice,
    ],
  );

  return {
    HistoricalOrder,
  };
};
