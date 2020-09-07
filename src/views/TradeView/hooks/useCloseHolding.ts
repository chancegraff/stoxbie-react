import {
  useCallback,
} from "react";
import {
  PresentHoldingType,
} from "holding-types";

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

export type CloseHoldingHook = {
  closeHolding: (present: PresentHoldingType) => void;
}

/**
 * @description Closes an existing holding and updates the ledger
 * @returns {void} Nothing
 */
export const useCloseHolding = (): CloseHoldingHook =>
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

  const closeHolding = useCallback(
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
    closeHolding,
  };
};
