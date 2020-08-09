import React, { useMemo } from "react";
import {
  StyledBody,
  StyledHead,
} from "baseui/dist/table";
import { HistoricalPrice } from "iex";
import numbro from "numbro";

import Spinner from "components/BaseUI/Spinner";

import {
  Container,
  FullTable,
  HeadCell,
  RightAlignedCell,
  StickyFooter,
} from "./TradeHistory.styled";
import TradeRowsClosed from "./TradeRowsClosed";
import TradeRowsOpened from "./TradeRowsOpened";

type Props = {
  pastTrades: HistoricalTradeFinished[];
  currentTrades: HistoricalTradeStarted[];
  currentPrice?: HistoricalPrice;
  playerLedger: HistoricalLedger;
  handleTrade: (sharePrice: number, shareCount: number) => void;
};

const TradeHistory: React.FC<Props> = ({
  pastTrades,
  playerLedger,
  currentTrades,
  currentPrice,
  handleTrade,
}) =>
{
  const safeChange = useMemo(
    () =>
    {
      if (pastTrades.length > 0)
      {
        return numbro(playerLedger.totalChange).format({
          average: true,
          output: "percent",
        });
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
      return numbro(playerLedger.totalBalance).formatCurrency({
        average: true,
        totalLength: 1,
      });
    },
    [ playerLedger ],
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
            currentTrades={currentTrades}
            currentPrice={currentPrice}
            handleTrade={handleTrade}
          />
          <TradeRowsClosed pastTrades={pastTrades} />
        </StyledBody>
        <StickyFooter>
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
