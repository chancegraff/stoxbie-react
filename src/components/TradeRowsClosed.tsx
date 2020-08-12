import React from "react";

import TradeRow from "components/TradeRow";

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
