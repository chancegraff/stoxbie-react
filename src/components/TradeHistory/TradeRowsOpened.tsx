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
  combinedHoldings?: HistoricalTradeStarted;
  presentPrice: HistoricalPrice;
  handleOrder: (sharePrice: number, shareCount: number) => void;
};

const TradeRowsOpened: React.FC<Props> = (
  {
    totalShareCount,
    combinedHoldings,
    presentPrice,
    handleOrder,
  },
) =>
{
  if (!combinedHoldings)
  {
    return null;
  }

  return (
    <TradeRow
      totalShareCount={totalShareCount}
      handleOrder={handleOrder}
      sharePrice={presentPrice.close}
      holding={combinedHoldings}
    />
  );
};

export default TradeRowsOpened;
