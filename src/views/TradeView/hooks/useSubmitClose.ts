import {
  useCallback,
} from "react";

import {
  useHistoricalHolding,
} from "./Historical/useHistoricalHolding";
import {
  useUpdateHistoricalHoldings,
} from "./Historical/useUpdateHistoricalHoldings";
import {
  usePresentLedger,
} from "./Present/usePresentLedger";
import {
  useRemovePresentHolding,
} from "./Present/useRemovePresentHolding";
import {
  useUpdatePresentLedgers,
} from "./Present/useUpdatePresentLedgers";

export type SubmitCloseHook = {
  submitClose: (present: PresentHolding) => void;
}

/**
 * @description Creates historical holding, removes present holding, updates the ledger
 * @returns {void} Nothing
 */
export const useSubmitClose = (): SubmitCloseHook =>
{
  const {
    HistoricalHolding,
  } = useHistoricalHolding();
  const {
    PresentLedger,
  } = usePresentLedger();
  const {
    removePresentHolding,
  } = useRemovePresentHolding();
  const {
    updateHistoricalHoldings,
  } = useUpdateHistoricalHoldings();
  const {
    updatePresentLedgers,
  } = useUpdatePresentLedgers();

  const submitClose = useCallback(
    (
      present: PresentHolding,
    ) =>
    {
      const holding = HistoricalHolding(
        present,
      );

      if (!holding)
      {
        return;
      }

      const ledger = PresentLedger(
        holding.historical,
      );

      if (!ledger)
      {
        return;
      }

      removePresentHolding(
        present,
      );
      updateHistoricalHoldings(
        holding,
      );
      updatePresentLedgers(
        ledger,
      );
    },
    [
      HistoricalHolding,
      PresentLedger,
      removePresentHolding,
      updateHistoricalHoldings,
      updatePresentLedgers,
    ],
  );

  return {
    submitClose,
  };
};
