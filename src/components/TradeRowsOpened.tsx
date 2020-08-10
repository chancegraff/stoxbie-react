import React, { useCallback } from "react";
import { HistoricalPrice } from "iex";

import TradeRow from "./TradeRow";

type Props = {
  visibleTrade?: HistoricalTradeStarted;
  currentPrice: HistoricalPrice;
  handleTrade: (sharePrice: number, shareCount: number) => void;
};

const TradeRowsOpened: React.FC<Props> = ({
  visibleTrade,
  currentPrice,
  handleTrade,
}) =>
{
  const handleExit = useCallback(
    (
      sharePrice: number,
      shareCount: number,
    ) =>
    {
      handleTrade(
        sharePrice,
        shareCount,
      );
    },
    [ handleTrade ],
  );

  if (!visibleTrade)
  {
    return null;
  }

  return (
    <TradeRow
      handleTrade={handleExit}
      sharePrice={currentPrice.close}
      trade={visibleTrade}
    />
  );
};

export default TradeRowsOpened;
