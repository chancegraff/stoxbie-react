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

type OpenHoldingHook = {
  openHolding: (orderAmount: number) => void;
};

/**
 * @description Creates a new present holding and updates the ledger
 * @returns {void} Nothing
 */
export const useOpenHolding = (): OpenHoldingHook =>
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

  const openHolding = useCallback(
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
    openHolding,
  };
};
