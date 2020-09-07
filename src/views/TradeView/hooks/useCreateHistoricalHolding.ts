import {
  useCallback,
} from "react";
import {
  ClosedHolding,
  Holding,
} from "holding-types";
import {
  List,
} from "immutable";
import {
  useRecoilState,
} from "recoil";

import {
  historicalHoldingsState,
} from "store/Atoms";

type CreateHistoricalHoldingHook = {
  historicalHoldings: List<Holding>;
  createHistoricalHolding: (holding: ClosedHolding) => void;
};

/**
 * @description Creates a new historical holding and adds it to state
 * @returns {CreateHistoricalHoldingHook} Callback to create historical holding
 */
export const useCreateHistoricalHolding = (): CreateHistoricalHoldingHook =>
{
  const [
    historicalHoldings,
    setHistoricalHoldings,
  ] = useRecoilState(
    historicalHoldingsState,
  );

  const createHistoricalHolding = useCallback(
    (
      holding: ClosedHolding,
    ) =>
    {
      setHistoricalHoldings(
        historicalHoldings.unshift(
          holding,
        ),
      );
    },
    [
      historicalHoldings,
      setHistoricalHoldings,
    ],
  );

  return {
    historicalHoldings,
    createHistoricalHolding,
  };
};
