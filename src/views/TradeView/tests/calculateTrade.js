export default (
  sharePrice,
  shareCount,
  previousTrade = {},
) =>
{
  if (previousTrade.OpenPrice && previousTrade.OpenCount)
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
  }

  const {
    TotalShares: PreviousTotalShares = 0,
    OpenPrice = sharePrice,
    OpenCount = shareCount,
    ClosePrice = undefined,
    CloseCount = undefined,
    ChangeBalance = undefined,
    LedgerBalance = 10000,
    LedgerReturns = 0,
    LedgerChange = undefined,
  } = previousTrade;

  const TotalShares = PreviousTotalShares + shareCount;

  return {
    TotalShares,
    OpenPrice,
    OpenCount,
    ClosePrice,
    CloseCount,
    ChangeBalance,
    LedgerBalance: LedgerBalance - (OpenCount * OpenPrice),
    LedgerReturns,
    LedgerChange,
  };
};
