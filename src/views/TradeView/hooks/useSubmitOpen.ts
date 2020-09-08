import {
  useCallback,
} from "react";

import {
  usePresentHolding,
} from "./Present/usePresentHolding";
import {
  usePresentLedger,
} from "./Present/usePresentLedger";
import {
  useUpdatePresentHoldings,
} from "./Present/useUpdatePresentHoldings";
import {
  useUpdatePresentLedgers,
} from "./Present/useUpdatePresentLedgers";

type SubmitOpenHook = {
  submitOpen: (orderAmount: number) => void;
};

/**
 * @description Creates present holding, updates the ledger
 * @returns {void} Nothing
 */
export const useSubmitOpen = (): SubmitOpenHook =>
{
  const {
    PresentHolding,
  } = usePresentHolding();
  const {
    PresentLedger,
  } = usePresentLedger();
  const {
    updatePresentHoldings,
  } = useUpdatePresentHoldings();
  const {
    updatePresentLedgers,
  } = useUpdatePresentLedgers();

  const submitOpen = useCallback(
    (
      amount: number,
    ) =>
    {
      const holding = PresentHolding(
        amount,
      );

      if (!holding)
      {
        return;
      }

      const ledger = PresentLedger(
        holding.present,
      );

      if (!ledger)
      {
        return;
      }

      updatePresentHoldings(
        holding,
      );
      updatePresentLedgers(
        ledger,
      );
    },
    [
      PresentHolding,
      PresentLedger,
      updatePresentHoldings,
      updatePresentLedgers,
    ],
  );

  return {
    submitOpen,
  };
};
