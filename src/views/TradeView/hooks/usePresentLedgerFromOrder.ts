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

type PresentLedgerFromOrderHook = {
  presentLedgerFromOrder: (order: Order | undefined) => Ledger | undefined;
};

/**
 * @description Creates a new present ledger from amount and returns it
 * @returns {Ledger | undefined} New ledger created from amount
 */
export const usePresentLedgerFromOrder = (): PresentLedgerFromOrderHook =>
{
  const presentLedger = useRecoilValue(
    presentLedgerState,
  );

  const presentLedgerFromOrder = useCallback(
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
          opened: previousOpenedAmount,
          closed: previousClosedAmount,
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
              closed: previousClosedAmount + order.amount,
              opened: previousOpenedAmount,
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
              closed: previousClosedAmount,
              opened: previousOpenedAmount + order.amount,
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
    presentLedgerFromOrder,
  };
};
