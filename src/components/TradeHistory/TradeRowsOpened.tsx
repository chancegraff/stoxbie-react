import React from "react";
import {
  HistoricalPrice,
} from "iex-cloud";
import {
  HistoricalTradeStarted,
} from "trade-types";

import TradeRow from "components/TradeHistory/TradeRow";

type Props = {
  totalShareCount: number;
  visibleTrade?: HistoricalTradeStarted;
  currentPrice: HistoricalPrice;
  handleTrade: (sharePrice: number, shareCount: number) => void;
};

const TradeRowsOpened: React.FC<Props> = (
  {
    totalShareCount,
    visibleTrade,
    currentPrice,
    handleTrade,
  },
) =>
{
  if (!visibleTrade)
  {
    return null;
  }

  return (
    <TradeRow
      totalShareCount={totalShareCount}
      handleTrade={handleTrade}
      sharePrice={currentPrice.close}
      trade={visibleTrade}
    />
  );
};

export default TradeRowsOpened;
