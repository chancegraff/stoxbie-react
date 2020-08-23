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
  pastTrades: HistoricalTradeFinished[];
  visibleTrade?: HistoricalTradeStarted;
  currentPrice?: HistoricalPrice;
  playerLedger: HistoricalLedger;
  currentTrades?: HistoricalTradeStarted[];
  pastLedgers?: HistoricalLedger[];
  handleTrade: (sharePrice: number, shareCount: number) => void;
};

// TODO Replace Table with Grommet
const TradeHistory: React.FC<Props> = (
  {
    pastTrades,
    playerLedger,
    visibleTrade,
    currentPrice,
    handleTrade,
  },
) =>
{
  if (!currentPrice)
  {
    return <Spinner Container={StyledContainer} />;
  }

  return (
    <StyledContainer>
      <StyledTable>
        <TradeHeader />
        <StyledBody>
          <TradeRowsOpened
            totalShareCount={playerLedger.totalCount}
            visibleTrade={visibleTrade}
            currentPrice={currentPrice}
            handleTrade={handleTrade}
          />
          <TradeRowsClosed pastTrades={pastTrades} />
        </StyledBody>
        <TradeFooter
          pastTrades={pastTrades}
          playerLedger={playerLedger}
        />
      </StyledTable>
    </StyledContainer>
  );
};

export default TradeHistory;
