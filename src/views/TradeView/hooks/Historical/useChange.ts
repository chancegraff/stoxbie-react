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
  ChangesType,
  HistoricalHoldingType,
  UnfinishedHistoricalHoldingType,
} from "trade-types";

import {
  presentPriceState,
} from "store/Selectors";

type ChangeHook = {
  Change: (unfinishedHolding: UnfinishedHistoricalHoldingType | undefined) => HistoricalHoldingType | undefined;
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
      unfinishedHolding: UnfinishedHistoricalHoldingType | undefined,
    ): HistoricalHoldingType | undefined =>
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
        orders: {
          present,
          historical,
        },
      } = unfinishedHolding;

      const balance = {
        dollars: (historical.balance - (present.amount * present.price)) * present.direction,
      };

      const changes: ChangesType = {
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
        changes,
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
