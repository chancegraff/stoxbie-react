import React, {
  useMemo,
} from "react";
import {
  StyledBody,
  StyledHead,
} from "baseui/dist/table";
import {
  HistoricalPrice,
} from "iex-cloud";
import {
  HistoricalLedger,
  HistoricalTradeFinished,
  HistoricalTradeStarted,
} from "trade-types";

import {
  formatCurrency,
  formatPercentage,
} from "utils/Utilities";
import Spinner from "components/Grommet/Spinner";
import TradeRowsClosed from "components/TradeHistory/TradeRowsClosed";
import TradeRowsOpened from "components/TradeHistory/TradeRowsOpened";

import {
  StyledCell,
  StyledContainer,
  StyledFooterRow,
  StyledHeadCell,
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
  const safeChange = useMemo(
    () =>
    {
      if (pastTrades.length > 0)
      {
        return formatPercentage(
          playerLedger.totalChange,
        );
      }
    },
    [
      playerLedger,
      pastTrades,
    ],
  );
  const safeBalance = useMemo(
    () =>
    {
      return formatCurrency(
        playerLedger.totalBalance,
      );
    },
    [
      playerLedger,
    ],
  );

  if (!currentPrice)
  {
    return <Spinner Container={StyledContainer} />;
  }

  return (
    <StyledContainer>
      <StyledTable>
        <StyledHead role="headerRow">
          <StyledHeadCell>
            Shares
          </StyledHeadCell>
          <StyledHeadCell>
            Open
          </StyledHeadCell>
          <StyledHeadCell>
            Close
          </StyledHeadCell>
          <StyledHeadCell>
            Equity
          </StyledHeadCell>
        </StyledHead>
        <StyledBody>
          <TradeRowsOpened
            totalShareCount={playerLedger.totalCount}
            visibleTrade={visibleTrade}
            currentPrice={currentPrice}
            handleTrade={handleTrade}
          />
          <TradeRowsClosed pastTrades={pastTrades} />
        </StyledBody>
        <StyledFooterRow role="footerRow">
          <StyledCell></StyledCell>
          <StyledCell></StyledCell>
          <StyledCell>
            {safeChange}
          </StyledCell>
          <StyledCell>
            {safeBalance}
          </StyledCell>
        </StyledFooterRow>
      </StyledTable>
    </StyledContainer>
  );
};

export default TradeHistory;
