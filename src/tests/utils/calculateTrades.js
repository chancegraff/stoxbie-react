import {
  formatCurrency,
  formatPercentage,
} from "services/Utilities";

export const calculateOpenedTrade = (
  ledgerBalance,
  shareCount,
  startPrice,
) =>
{
  // Opened trade
  const tradeCost = shareCount * startPrice.close; // pricePaid = openCount * price.close
  const ledgerBalanceAfterOpen = ledgerBalance - tradeCost; // previousTotalBalance = playerLedger.totalBalance - pricePaid;

  return {
    ledgerBalanceAfterOpen,
  };
};

export const calculateClosedTrade = (
  ledgerBalance,
  shareCount,
  {
    startPrice,
    endPrice,
  },
) =>
{
  // Opened trade
  const tradeCost = shareCount * startPrice.close; // pricePaid = closeCount * trade.openPrice
  const ledgerBalanceAfterOpen = ledgerBalance - tradeCost; // previousTotalBalance = playerLedger.totalBalance - pricePaid;

  // Closed trade
  const tradeProfit = shareCount * endPrice.close; // trade.closeBalance = closeCount * price.close;
  const tradeChange = tradeProfit - tradeCost; // trade.changeBalance = trade.closeBalance - pricePaid
  const ledgerBalanceAfterClose = ledgerBalanceAfterOpen + tradeProfit; // playerLedger.totalBalance = previousTotalBalance + trade.closeBalance;
  const ledgerReturnsAfterClose = 0 + tradeChange; // playerLedger.totalReturns = previousTotalReturns + trade.changeBalance;
  const ledgerChangeAfterClose = ledgerReturnsAfterClose / ledgerBalanceAfterClose; // playerLedger.totalChange = nextPlayerLedger.totalReturns / nextPlayerLedger.totalBalance;

  // Formatted values
  const StartPriceClose = formatCurrency(
    startPrice.close,
  );
  const EndPriceClose = formatCurrency(
    endPrice.close,
  );
  const LedgerBalanceAfterOpen = formatCurrency(
    ledgerBalanceAfterOpen,
  );
  const LedgerBalanceAfterClose = formatCurrency(
    ledgerBalanceAfterClose,
  );
  const LedgerChangeAfterClose = formatPercentage(
    ledgerChangeAfterClose,
  );

  return {
    StartPriceClose,
    EndPriceClose,
    LedgerBalanceAfterOpen,
    LedgerBalanceAfterClose,
    LedgerChangeAfterClose,
  };
};
