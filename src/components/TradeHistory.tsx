import React, {
  useMemo,
} from "react";
import {
  StyledBody,
  StyledHead,
} from "baseui/dist/table";
import {
  HistoricalPrice,
} from "iex";

import {
  formatCurrency,
  formatPercentage,
} from "services/Utilities";
import Spinner from "components/BaseUI/Spinner";
import TradeRowsClosed from "components/TradeRowsClosed";
import TradeRowsOpened from "components/TradeRowsOpened";

import {
  Container,
  FullTable,
  HeadCell,
  RightAlignedCell,
  StickyFooter,
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
    return <Spinner container={Container} />;
  }

  return (
    <Container alignItems="flex-start">
      <FullTable>
        <StyledHead>
          <HeadCell>
            Open
          </HeadCell>
          <HeadCell>
            Close
          </HeadCell>
          <HeadCell>
            PL %
          </HeadCell>
          <HeadCell>
            PL $
          </HeadCell>
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
        <StickyFooter role="footerRow">
          <RightAlignedCell></RightAlignedCell>
          <RightAlignedCell></RightAlignedCell>
          <RightAlignedCell>
            {safeChange}
          </RightAlignedCell>
          <RightAlignedCell>
            {safeBalance}
          </RightAlignedCell>
        </StickyFooter>
      </FullTable>
    </Container>
  );
};

export default TradeHistory;
