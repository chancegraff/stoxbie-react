import {
  useCallback,
} from "react";
import {
  useRecoilState,
  useRecoilValue,
} from "recoil";
import {
  HistoricalHoldingType,
} from "trade-types";

import {
  presentHoldingsState,
} from "store/Atoms";
import {
  presentLedgerState,
} from "store/Selectors";

import {
  useHistoricalHolding,
} from "./Historical/useHistoricalHolding";
import {
  useUpdateHistoricalHoldings,
} from "./Historical/useUpdateHistoricalHoldings";
import {
  useClearPresentHoldings,
} from "./Present/useClearPresentHoldings";
import {
  usePresentLedger,
} from "./Present/usePresentLedger";
import {
  useUpdatePresentLedgers,
} from "./Present/useUpdatePresentLedgers";

export type SubmitCloseAllHook = {
  submitCloseAll: () => void;
}

/**
 * @description Closes all present holdings, creates historical holdings, and updates ledger
 * @returns {void} Nothing
 */
export const useSubmitCloseAll = (): SubmitCloseAllHook =>
{
  const [
    presentHoldings,
  ] = useRecoilState(
    presentHoldingsState,
  );

  const presentLedger = useRecoilValue(
    presentLedgerState,
  );

  const {
    HistoricalHolding,
  } = useHistoricalHolding();
  const {
    PresentLedger,
  } = usePresentLedger();
  const {
    clearPresentHoldings,
  } = useClearPresentHoldings();
  const {
    updateHistoricalHoldings,
  } = useUpdateHistoricalHoldings();
  const {
    updatePresentLedgers,
  } = useUpdatePresentLedgers();

  const submitCloseAll = useCallback(
    () =>
    {
      const historicalHoldings = presentHoldings.reduce(
        (
          all: HistoricalHoldingType[],
          present,
        ) =>
        {
          const historicalHolding = HistoricalHolding(
            present,
          );

          if (historicalHolding)
          {
            all.push(
              historicalHolding,
            );
          }

          return all;
        },
        [],
      );

      if (!historicalHoldings.length)
      {
        return;
      }

      const ledger = historicalHoldings.reduce(
        (
          previousLedger,
          currentHolding,
        ) =>
        {
          const {
            orders: {
              historical,
            },
          } = currentHolding;

          const nextLedger = PresentLedger(
            previousLedger,
            historical,
            currentHolding,
          );

          if (!nextLedger)
          {
            return previousLedger;
          }

          return nextLedger;
        },
        presentLedger,
      );

      if (!ledger)
      {
        return;
      }

      clearPresentHoldings();
      updateHistoricalHoldings(
        historicalHoldings,
      );
      updatePresentLedgers(
        ledger,
      );
    },
    [
      presentLedger,
      presentHoldings,
      HistoricalHolding,
      PresentLedger,
      clearPresentHoldings,
      updateHistoricalHoldings,
      updatePresentLedgers,
    ],
  );

  return {
    submitCloseAll,
  };
};
