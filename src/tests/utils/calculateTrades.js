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
    tradeCost,
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
  const {
    tradeCost,
    ledgerBalanceAfterOpen,
  } = calculateOpenedTrade(
    ledgerBalance,
    shareCount,
    startPrice,
  );

  const tradeProfit = shareCount * endPrice.close; // trade.closeBalance = closeCount * price.close;
  const tradeChange = tradeProfit - tradeCost; // trade.changeBalance = trade.closeBalance - pricePaid
  const ledgerBalanceAfterClose = ledgerBalanceAfterOpen + tradeProfit; // playerLedger.totalBalance = previousTotalBalance + trade.closeBalance;
  const ledgerReturnsAfterClose = 0 + tradeChange; // playerLedger.totalReturns = previousTotalReturns + trade.changeBalance;
  const ledgerChangeAfterClose = ledgerReturnsAfterClose / ledgerBalanceAfterClose; // playerLedger.totalChange = nextPlayerLedger.totalReturns / nextPlayerLedger.totalBalance;

  return {
    ...formatOpenedTrade(
      startPrice,
      ledgerBalanceAfterOpen,
    ),
    ...formatClosedTrade(
      endPrice,
      ledgerBalanceAfterClose,
      ledgerChangeAfterClose,
    ),
  };
};

export const formatOpenedTrade = (
  startPrice,
  ledgerBalanceAfterOpen,
) =>
{
  const StartPriceClose = formatCurrency(
    startPrice.close,
  );
  const LedgerBalanceAfterOpen = formatCurrency(
    ledgerBalanceAfterOpen,
  );

  return {
    StartPriceClose,
    LedgerBalanceAfterOpen,
  };
};

export const formatClosedTrade = (
  endPrice,
  ledgerBalanceAfterClose,
  ledgerChangeAfterClose,
) =>
{
  const EndPriceClose = formatCurrency(
    endPrice.close,
  );
  const LedgerBalanceAfterClose = formatCurrency(
    ledgerBalanceAfterClose,
  );
  const LedgerChangeAfterClose = formatPercentage(
    ledgerChangeAfterClose,
  );

  return {
    EndPriceClose,
    LedgerBalanceAfterClose,
    LedgerChangeAfterClose,
  };
};
