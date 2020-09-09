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
  OrderDirection,
} from "utils/Enums";
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

      const amount = Amount(
        present.amount,
      );
      const date = new Date();
      const direction = OppositeDirection(
        present.direction,
      );
      const price = closePrice;
      const balance = Balance(
        present.amount,
        closePrice,
      );

      return {
        amount,
        balance: present.direction === OrderDirection.Buy
          ? balance
          : present.balance * 2 - balance,
        date,
        direction,
        price,
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
