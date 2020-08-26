import React from "react";
import {
  HistoricalPrice,
} from "iex-cloud";
import {
  HistoricalLedger,
  HistoricalTradeStarted,
} from "trade-types";

import {
  StyledSubmitOrder,
} from "./CloseHoldings.styled";

type Props = {
  presentPrice: HistoricalPrice | undefined;
  presentLedger: HistoricalLedger | undefined;
  summarizedHoldings: HistoricalTradeStarted | undefined;
  handleSubmit: (sharePrice: number, shareCount: number) => void;
};

const CloseHoldings: React.FC<Props> = (
  {
    presentPrice,
    presentLedger,
    summarizedHoldings,
    handleSubmit,
  },
) =>
{
  if (!summarizedHoldings || !presentPrice || !presentLedger)
  {
    return null;
  }

  return (
    <StyledSubmitOrder
      presentPriceClose={presentPrice.close}
      orderDirection={(summarizedHoldings.openDirection * -1) as 1 | -1}
      orderShareCount={presentLedger.totalCount}
      handleSubmit={handleSubmit}
    />
  );
};

export default CloseHoldings;
