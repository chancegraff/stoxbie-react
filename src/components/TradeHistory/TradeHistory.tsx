import React from "react";
import {
  StyledBody,
} from "baseui/dist/table";
import {
  HistoricalPrice,
} from "iex-cloud";
import {
  HistoricalLedger,
  HistoricalTradeFinished,
  HistoricalTradeStarted,
} from "trade-types";

import Spinner from "components/Grommet/Spinner";
import TradeRowsClosed from "components/TradeHistory/TradeRowsClosed";
import TradeRowsOpened from "components/TradeHistory/TradeRowsOpened";

import TradeFooter from "./TradeFooter";
import TradeHeader from "./TradeHeader";
import {
  StyledContainer,
  StyledTable,
} from "./TradeHistory.styled";

type Props = {
  // historicalLedgers?: HistoricalLedger[];
  historicalHoldings: HistoricalTradeFinished[];
  presentLedger: HistoricalLedger;
  presentPrice?: HistoricalPrice;
  // presentHoldings?: HistoricalTradeStarted[];
  combinedHoldings?: HistoricalTradeStarted;
  handleOrder: (sharePrice: number, shareCount: number) => void;
};

const TradeHistory: React.FC<Props> = (
  {
    historicalHoldings,
    presentLedger,
    presentPrice,
    combinedHoldings,
    handleOrder,
  },
) =>
{
  if (!presentPrice)
  {
    return <Spinner Container={StyledContainer} />;
  }

  return (
    <StyledContainer>
      <StyledTable>
        <TradeHeader />
        <StyledBody>
          <TradeRowsOpened
            totalShareCount={presentLedger.totalCount}
            combinedHoldings={combinedHoldings}
            presentPrice={presentPrice}
            handleOrder={handleOrder}
          />
          <TradeRowsClosed historicalHoldings={historicalHoldings} />
        </StyledBody>
        <TradeFooter
          historicalHoldings={historicalHoldings}
          presentLedger={presentLedger}
        />
      </StyledTable>
    </StyledContainer>
  );
};

export default TradeHistory;
