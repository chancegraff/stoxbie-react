import React from "react";
import { HistoricalPrice } from "iex";

import TradeRow from "./TradeRow";

type Props = {
  currentTrades: HistoricalTradeStarted[];
  currentPrice: HistoricalPrice;
  handleTrade: (sharePrice: number, shareCount: number) => void;
};

const TradeRowsOpened: React.FC<Props> = ({
  currentTrades,
  currentPrice,
  handleTrade,
}) =>
{
  return (
    <>
      {
        currentTrades.map((
          trade,
          index,
        ) =>
        {
          return (
            <TradeRow
              key={index}
              handleTrade={handleTrade}
              sharePrice={currentPrice.close}
              trade={trade}
            />
          );
        })
      }
    </>
  );
};

export default TradeRowsOpened;
