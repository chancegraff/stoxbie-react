import {
  useCallback,
} from "react";

import {
  useOpenOrderFromAmount,
} from "./useOpenOrderFromAmount";
import {
  usePresentHoldingFromOrder,
} from "./usePresentHoldingFromOrder";
import {
  usePresentLedgerFromOrder,
} from "./usePresentLedgerFromOrder";
import {
  useUpdatePresentHoldings,
} from "./useUpdatePresentHoldings";
import {
  useUpdatePresentLedgers,
} from "./useUpdatePresentLedgers";

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
    openOrderFromAmount,
  } = useOpenOrderFromAmount();
  const {
    presentHoldingFromOrder,
  } = usePresentHoldingFromOrder();
  const {
    presentLedgerFromOrder,
  } = usePresentLedgerFromOrder();
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
      const openOrder = openOrderFromAmount(
        amount,
      );
      const presentHolding = presentHoldingFromOrder(
        openOrder,
      );
      const presentLedger = presentLedgerFromOrder(
        openOrder,
      );

      if (!presentHolding ||
          !presentLedger)
      {
        return;
      }

      updatePresentHoldings(
        presentHolding,
      );
      updatePresentLedgers(
        presentLedger,
      );
    },
    [
      openOrderFromAmount,
      presentHoldingFromOrder,
      presentLedgerFromOrder,
      updatePresentHoldings,
      updatePresentLedgers,
    ],
  );

  return {
    openHolding,
  };
};
