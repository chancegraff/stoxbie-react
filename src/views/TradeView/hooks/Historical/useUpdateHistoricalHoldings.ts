import {
  useCallback,
} from "react";
import {
  useRecoilState,
} from "recoil";
import {
  HistoricalHoldingType,
} from "trade-types";

import {
  historicalHoldingsState,
} from "store/Atoms";

type UpdateHistoricalHoldingsHook = {
  updateHistoricalHoldings: (historicalHolding: HistoricalHoldingType[] | HistoricalHoldingType) => void;
};

/**
 * @description Creates a new historical holding and adds it to state
 * @returns {void} Nothing
 */
export const useUpdateHistoricalHoldings = (): UpdateHistoricalHoldingsHook =>
{
  const [
    historicalHoldings,
    setHistoricalHoldings,
  ] = useRecoilState(
    historicalHoldingsState,
  );

  const updateHistoricalHoldings = useCallback(
    (
      historicalHolding: HistoricalHoldingType[] | HistoricalHoldingType,
    ) =>
    {
      const nextHistoricalHoldings = [];

      if (
        Array.isArray(
          historicalHolding,
        )
      )
      {
        nextHistoricalHoldings.unshift(
          ...historicalHolding,
        );
      }
      else
      {
        nextHistoricalHoldings.unshift(
          historicalHolding,
        );
      }

      setHistoricalHoldings(
        historicalHoldings.unshift(
          ...nextHistoricalHoldings,
        ),
      );
    },
    [
      historicalHoldings,
      setHistoricalHoldings,
    ],
  );

  return {
    updateHistoricalHoldings,
  };
};
