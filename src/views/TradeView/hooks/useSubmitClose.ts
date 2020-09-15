import {
  useCallback,
} from "react";
import {
  useRecoilValue,
} from "recoil";
import {
  PresentHoldingType,
} from "trade-types";

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
        throw new Error(
          "Could not build historical holding while closing order",
        );
      }

      const {
        orders: {
          historical,
        },
      } = holding;

      const ledger = PresentLedger(
        presentLedger,
        historical,
        holding,
      );

      if (!ledger)
      {
        throw new Error(
          "Could not build present ledger while closing order",
        );
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
      presentLedger,
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
