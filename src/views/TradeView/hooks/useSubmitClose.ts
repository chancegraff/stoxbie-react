import {
  useCallback,
} from "react";
import {
  PresentHoldingType,
} from "trade-types";

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
  submitClose: (present: PresentHoldingType) => void;
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
      present: PresentHoldingType,
    ) =>
    {
      const holding = HistoricalHolding(
        present,
      );

      if (!holding)
      {
        return;
      }

      const {
        orders: {
          historical,
        },
      } = holding;

      const ledger = PresentLedger(
        historical,
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
