/**
 * TODO Fix these so that they take in and return an array of current and past trades
 */

export const calculateClose = (
  sharePrice,
  shareCount,
  previousTrade = {},
) =>
{
  const {
    TotalShares: PreviousTotalShares,
    OpenPrice,
    OpenCount,
    ClosePrice = sharePrice,
    CloseCount = shareCount,
    ChangeBalance = (ClosePrice * CloseCount) - (OpenPrice * CloseCount),
    ChangePercent = ChangeBalance / (OpenPrice * CloseCount),
    LedgerBalance: PreviousLedgerBalance,
    LedgerReturns: PreviousLedgerReturns,
  } = previousTrade;

  const TotalShares = PreviousTotalShares - shareCount;
  const LedgerBalance = PreviousLedgerBalance + (CloseCount * ClosePrice);
  const LedgerReturns = PreviousLedgerReturns + ChangeBalance;
  const LedgerChange = LedgerReturns / LedgerBalance;

  return {
    TotalShares,
    OpenPrice,
    OpenCount,
    ClosePrice,
    CloseCount,
    ChangeBalance,
    ChangePercent,
    LedgerBalance,
    LedgerReturns,
    LedgerChange,
  };
};

export const calculateOpen = (
  sharePrice,
  shareCount,
  previousTrade = {},
) =>
{
  const {
    TotalShares: PreviousTotalShares = 0,
    LedgerBalance: PreviousLedgerBalance = 10000,
    LedgerReturns: PreviousLedgerReturns = 0,
  } = previousTrade;

  const TotalShares = PreviousTotalShares + shareCount;

  return {
    TotalShares,
    OpenPrice: sharePrice,
    OpenCount: shareCount,
    ClosePrice: undefined,
    CloseCount: undefined,
    ChangeBalance: undefined,
    LedgerBalance: PreviousLedgerBalance - (sharePrice * shareCount),
    LedgerReturns: PreviousLedgerReturns,
    LedgerChange: undefined,
  };
};
