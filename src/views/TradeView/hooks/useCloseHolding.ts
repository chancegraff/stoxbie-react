import {
  useCallback,
} from "react";
import {
  OpenedHolding,
} from "holding-types";

export type CloseHoldingHook = {
  closeHolding: (presentHolding: OpenedHolding) => void;
}

/**
 * @description Closes an existing holding and updates the ledger
 * @returns {void} Nothing
 */
export const useCloseHolding = (): CloseHoldingHook =>
{
  const closeHolding = useCallback(
    (
      presentHolding: OpenedHolding,
    ) =>
    {
      /**
       * @todo Close the holding passed in and add it to historical holdings
       */
    },
    [],
  );

  return {
    closeHolding,
  };
};

// const closeTrade = useCallback(
//   (
//     sharePrice: number,
//     shareCount: number,
//   ) =>
//   {
//     if (presentHoldings.length <= 0)
//     {
//       return;
//     }

//     const {
//       ...nextHistoricalLedgers
//     } = presentLedger;
//     const [
//       ...nextPresentHoldings
//     ] = presentHoldings;
//     const nextHistoricalHoldings: HistoricalTradeFinished[] = [];
//     const [
//       ...sortedPresentHoldings
//     ] = presentHoldings.sort(
//       (
//         previousTrade,
//         nextTrade,
//       ) =>
//       {
//         return previousTrade.openPrice - nextTrade.openPrice;
//       },
//     );
//     let remainingOrderShareCount = Math.abs(
//       shareCount,
//     );

//     while (
//       remainingOrderShareCount > 0 &&
//         sortedPresentHoldings.length > 0
//     )
//     {
//       const {
//         totalBalance: previousTotalBalance,
//         totalReturns: previousTotalReturns,
//         totalCount: previousTotalCount,
//       } = nextHistoricalLedgers;

//       // Fill as much of the order as we can with the lowest-opened trade
//       const lowestTrade = sortedPresentHoldings.shift() as HistoricalTradeStarted;
//       const countPossible = Math.min(
//         lowestTrade.openCount,
//         remainingOrderShareCount,
//       );

//       const closePrice = sharePrice;
//       const closeCount = Math.abs(
//         countPossible,
//       );
//       const closeDirection = (countPossible / closeCount) as -1 | 1;
//       const closeDate = new Date();
//       const closeBalance = closeCount * sharePrice;
//       const changePrice = (closePrice - lowestTrade.openPrice) * lowestTrade.openDirection;
//       const pricePaid = closeCount * lowestTrade.openPrice;
//       const changeBalance = (closeBalance - pricePaid) * lowestTrade.openDirection;
//       const changePercent = changeBalance / pricePaid;
//       const closedTrade = {
//         ...lowestTrade,
//         changeBalance,
//         changePercent,
//         changePrice,
//         closePrice,
//         closeCount,
//         closeDirection,
//         closeBalance,
//         closeDate,
//       };

//       // Add closed trade to front of collection
//       nextHistoricalHoldings.unshift(
//         closedTrade,
//       );

//       // Update ledger values and remaining shares in order
//       remainingOrderShareCount -= countPossible;
//       nextHistoricalLedgers.totalBalance = previousTotalBalance + (closedTrade.closePrice * closedTrade.closeCount);
//       nextHistoricalLedgers.totalReturns = previousTotalReturns + closedTrade.changeBalance;
//       nextHistoricalLedgers.totalChange = nextHistoricalLedgers.totalReturns / nextHistoricalLedgers.totalBalance;
//       nextHistoricalLedgers.totalCount = previousTotalCount - closedTrade.closeCount;

//       // Remove the closed trade from current trades
//       const lowestTradeIndex = nextPresentHoldings.indexOf(
//         lowestTrade,
//       );

//       nextPresentHoldings.splice(
//         lowestTradeIndex,
//         1,
//       );

//       // Check if there are any shares left in the trade we just removed
//       const remainingTradeShareCount = closedTrade.openCount - closedTrade.closeCount;

//       if (remainingTradeShareCount > 0)
//       {
//         // Copy the previous share, update its openBalance and openCount, and add it back in the same place
//         const remainingBalance = closedTrade.openPrice * remainingTradeShareCount;
//         const nextTrade: HistoricalTradeStarted = {
//           ...lowestTrade,
//           openBalance: remainingBalance,
//           openCount: remainingTradeShareCount,
//         };

//         nextPresentHoldings.splice(
//           lowestTradeIndex,
//           0,
//           nextTrade,
//         );
//       }
//     }

//     // Update state values
//     updatePresentHoldings(
//       nextPresentHoldings,
//     );
//     updateHistoricalHoldings(
//       nextHistoricalHoldings,
//     );
//     updateHistoricalLedgers(
//       nextHistoricalLedgers,
//     );
//   },
//   [
//     presentHoldings,
//     presentLedger,
//     updateHistoricalLedgers,
//     updatePresentHoldings,
//     updateHistoricalHoldings,
//   ],
// );
