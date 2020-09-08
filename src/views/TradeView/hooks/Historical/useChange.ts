import {
  useCallback,
} from "react";
import {
  differenceInBusinessDays,
} from "date-fns";
import {
  useRecoilValue,
} from "recoil";

import {
  presentPriceState,
} from "store/Selectors";

type ChangeHook = {
  Change: (unfinishedHolding: UnfinishedHistoricalHolding | undefined) => HistoricalHolding | undefined;
};

/**
 * @description Creates a change attribute for an existing historical holding
 * @returns {HistoricalHolding | undefined} Historical holding with change attribute added to it
 */
export const useChange = (): ChangeHook =>
{
  const presentPrice = useRecoilValue(
    presentPriceState,
  );

  const Change = useCallback(
    (
      unfinishedHolding: UnfinishedHistoricalHolding | undefined,
    ): HistoricalHolding | undefined =>
    {
      if (!unfinishedHolding ||
          !presentPrice)
      {
        return;
      }

      const {
        close: historicalPrice,
      } = presentPrice;

      const {
        present,
        historical,
      } = unfinishedHolding;

      const balance = {
        dollars: (historical.balance - (present.amount * present.price)) * present.direction,
      };

      const change: Change = {
        amount: {
          values: present.amount - historical.amount,
        },
        balance: {
          ...balance,
          percent: balance.dollars / (present.amount * present.price),
        },
        date: {
          days: differenceInBusinessDays(
            present.date,
            historical.date,
          ),
        },
        price: {
          dollars: (historicalPrice - present.price) * present.direction,
        },
      };

      return {
        ...unfinishedHolding,
        change,
      };
    },
    [
      presentPrice,
    ],
  );

  return {
    Change,
  };
};
