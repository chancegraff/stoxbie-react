import {
  useCallback,
} from "react";
import {
  HistoricalHoldingType,
  PresentHoldingType,
  UnfinishedHistoricalHoldingType,
} from "trade-types";

import {
  useChange,
} from "./useChange";
import {
  useHistoricalOrder,
} from "./useHistoricalOrder";

type HistoricalHoldingHook = {
  HistoricalHolding: (presentHolding: PresentHoldingType | undefined) => HistoricalHoldingType | undefined;
};

/**
 * @description Creates a historical holding from an existing order
 * @returns {HistoricalHolding | undefined} New historical holding
 */
export const useHistoricalHolding = (): HistoricalHoldingHook =>
{
  const {
    Change,
  } = useChange();
  const {
    HistoricalOrder,
  } = useHistoricalOrder();

  const HistoricalHolding = useCallback(
    (
      holding: PresentHoldingType | undefined,
    ): HistoricalHoldingType | undefined =>
    {
      if (!holding)
      {
        return;
      }

      const {
        orders: {
          present,
        },
      } = holding;

      const historical = HistoricalOrder(
        present,
      );

      if (!historical)
      {
        return;
      }

      const unfinishedHolding: UnfinishedHistoricalHoldingType = {
        ...holding,
        orders: {
          present,
          historical,
        },
      };

      return Change(
        unfinishedHolding,
      );
    },
    [
      HistoricalOrder,
      Change,
    ],
  );

  return {
    HistoricalHolding,
  };
};
