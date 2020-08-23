import React from "react";
import {
  HistoricalTradeFinished,
} from "trade-types";

import TradeRow from "components/TradeHistory/TradeRow";

type Props = {
  historicalHoldings: HistoricalTradeFinished[];
};

const TradeRowsClosed: React.FC<Props> = (
  {
    historicalHoldings,
  },
) =>
{
  return (
    <>
      {
        historicalHoldings.map(
          (
            holding,
            index,
          ) =>
          {
            return (
              <TradeRow
                key={index}
                holding={holding}
              />
            );
          },
        )
      }
    </>
  );
};

export default TradeRowsClosed;
