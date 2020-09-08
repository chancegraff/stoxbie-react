import {
  useCallback,
} from "react";
import {
  useRecoilValue,
} from "recoil";
import {
  LedgerType,
  OrderType,
} from "trade-types";

import {
  OrderDirection,
} from "utils/Enums";
import {
  presentLedgerState,
} from "store/Selectors";

type PresentLedgerHook = {
  PresentLedger: (order: OrderType | undefined) => LedgerType | undefined;
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
      order: OrderType | undefined,
    ): LedgerType | undefined =>
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
        case OrderDirection.Sell:
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
        case OrderDirection.Buy:
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
