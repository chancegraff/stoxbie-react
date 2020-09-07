import {
  useCallback,
} from "react";
import {
  Directions,
  Ledger,
  Order,
} from "holding-types";
import {
  useRecoilValue,
} from "recoil";

import {
  presentLedgerState,
} from "store/Selectors";

type PresentLedgerHook = {
  PresentLedger: (order: Order | undefined) => Ledger | undefined;
};

/**
 * @description Creates a new present ledger from amount and returns it
 * @returns {Ledger | undefined} New ledger created from amount
 */
export const usePresentLedger = (): PresentLedgerHook =>
{
  const presentLedger = useRecoilValue(
    presentLedgerState,
  );

  const PresentLedger = useCallback(
    (
      order: Order | undefined,
    ): Ledger | undefined =>
    {
      if (!order)
      {
        return;
      }

      const {
        balance: previousBalance,
        amounts: {
          present: previousPresentAmount,
          historical: previousHistoricalAmount,
          holding: previousHoldingAmount,
        },
      } = presentLedger;

      switch (order.direction)
      {
        case Directions.Sell:
        {
          return {
            ...presentLedger,
            balance: previousBalance + order.balance,
            amounts: {
              present: previousPresentAmount,
              historical: previousHistoricalAmount + order.amount,
              holding: previousHoldingAmount - order.amount,
            },
          };
        }
        case Directions.Buy:
        {
          return {
            ...presentLedger,
            balance: previousBalance - order.balance,
            amounts: {
              present: previousPresentAmount + order.amount,
              historical: previousHistoricalAmount,
              holding: previousHoldingAmount + order.amount,
            },
          };
        }
      }
    },
    [
      presentLedger,
    ],
  );

  return {
    PresentLedger,
  };
};
