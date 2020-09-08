import {
  useCallback,
} from "react";

import {
  useChange,
} from "./useChange";
import {
  useHistoricalOrder,
} from "./useHistoricalOrder";

type HistoricalHoldingHook = {
  HistoricalHolding: (presentHolding: PresentHolding | undefined) => HistoricalHolding | undefined;
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
      holding: PresentHolding | undefined,
    ): HistoricalHolding | undefined =>
    {
      if (!holding)
      {
        return;
      }

      const {
        present,
      } = holding;

      const historical = HistoricalOrder(
        present,
      );

      if (!historical)
      {
        return;
      }

      const unfinishedHolding: UnfinishedHistoricalHolding = {
        ...holding,
        historical,
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
