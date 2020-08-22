import React from "react";
import {
  HistoricalTradeFinished,
} from "trade-types";

import TradeRow from "components/TradeHistory/TradeRow";

type Props = {
  pastTrades: HistoricalTradeFinished[];
};

const TradeRowsClosed: React.FC<Props> = (
  {
    pastTrades,
  },
) =>
{
  return (
    <>
      {
        pastTrades.map(
          (
            pastTrade,
            index,
          ) =>
          {
            return (
              <TradeRow
                key={index}
                trade={pastTrade}
              />
            );
          },
        )
      }
    </>
  );
};

export default TradeRowsClosed;
