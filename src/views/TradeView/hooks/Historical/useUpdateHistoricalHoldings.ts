import {
  useCallback,
} from "react";
import {
  useRecoilState,
} from "recoil";

import {
  historicalHoldingsState,
} from "store/Atoms";

type UpdateHistoricalHoldingsHook = {
  updateHistoricalHoldings: (historicalHolding: HistoricalHolding) => void;
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
      historicalHolding: HistoricalHolding,
    ) =>
    {
      setHistoricalHoldings(
        historicalHoldings.unshift(
          historicalHolding,
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
