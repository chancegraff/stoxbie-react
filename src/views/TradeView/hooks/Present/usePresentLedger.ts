import {
  useCallback,
} from "react";
import {
  useRecoilValue,
} from "recoil";
import {
  HistoricalHoldingType,
  HistoricalOrderType,
  LedgerType,
  OrderType,
  PresentHoldingType,
  PresentOrderType,
} from "trade-types";

import {
  OrderDirection,
} from "utils/Enums";
import {
  presentLedgerState,
} from "store/Selectors";

type PresentLedgerHook = {
  PresentLedger: (order: OrderType | undefined, holding: PresentHoldingType | HistoricalHoldingType | undefined) => LedgerType | undefined;
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

  /**
   * @summary Getting rid of shares
   */
  const LedgerAfterHistoricalOrder = useCallback(
    (
      order: HistoricalOrderType,
      holding: HistoricalHoldingType,
    ) =>
    {
      const {
        balance: previousBalance,
        amounts,
        amounts: {
          holding: previousHoldingAmount,
        },
        returns,
        returns: {
          invested: previousReturnInvested,
          dollars: previousReturnDollars,
        },
      } = presentLedger;

      const {
        balance: historicalOrderBalance,
      } = order;
      const {
        orders: {
          present: {
            balance: presentOrderBalance,
          },
        },
      } = holding;
      const nextReturnDollars = previousReturnDollars + (historicalOrderBalance - presentOrderBalance);

      return {
        ...presentLedger,
        balance: previousBalance + order.balance,
        amounts: {
          ...amounts,
          holding: previousHoldingAmount - order.amount,
        },
        returns: {
          ...returns,
          dollars: nextReturnDollars,
          percent: nextReturnDollars / previousReturnInvested,
        },
      };
    },
    [
      presentLedger,
    ],
  );

  /**
   * @summary Getting more shares
   */
  const LedgerAfterPresentOrder = useCallback(
    (
      order: PresentOrderType,
    ) =>
    {
      const {
        balance: previousBalance,
        amounts,
        amounts: {
          invested: previousInvestedAmount,
          shorted: previousShortedAmount,
          holding: previousHoldingAmount,
        },
        returns,
        returns: {
          invested: previousInvested,
        },
      } = presentLedger;

      const nextLedger = {
        ...presentLedger,
        balance: previousBalance - order.balance,
        amounts: {
          ...amounts,
          holding: previousHoldingAmount + order.amount,
        },
        returns: {
          ...returns,
          invested: previousInvested + order.balance,
        },
      };

      if (order.direction === OrderDirection.Sell)
      {
        /**
         * @summary Getting more shorted shares
         */
        nextLedger.amounts.shorted = previousShortedAmount + order.amount;
      }
      else
      {
        /**
         * @summary Getting more invested shares
         */
        nextLedger.amounts.invested = previousInvestedAmount + order.amount;
      }

      return nextLedger;
    },
    [
      presentLedger,
    ],
  );

  const PresentLedger = useCallback(
    (
      order: OrderType | undefined,
      holding: PresentHoldingType | HistoricalHoldingType | undefined,
    ): LedgerType | undefined =>
    {
      if (
        !holding ||
        !order
      )
      {
        return;
      }

      const holdingHasHistoricalOrder = "historical" in holding.orders;
      const holdingType = holdingHasHistoricalOrder
        ? "historical"
        : "present";

      switch (holdingType)
      {
        case "historical":
        {
          return LedgerAfterHistoricalOrder(
            order,
            holding as HistoricalHoldingType,
          );
        }
        case "present":
        {
          return LedgerAfterPresentOrder(
            order,
          );
        }
      }
    },
    [
      LedgerAfterHistoricalOrder,
      LedgerAfterPresentOrder,
    ],
  );

  return {
    PresentLedger,
  };
};
