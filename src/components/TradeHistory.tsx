import React, { useMemo } from "react";
import { styled } from "baseui/dist";
import { Block } from "baseui/dist/block";
import {
  StyledBody,
  StyledCell,
  StyledHead,
  StyledHeadCell,
  StyledRow,
  StyledTable,
} from "baseui/dist/table";
import { HistoricalPrice } from "iex";
import numbro from "numbro";

import Spinner from "components/BaseUI/Spinner";

import TradeRow from "./TradeRow";

type Props = {
  pastTrades: HistoricalTradeFinished[];
  currentTrade?: HistoricalTradeStarted;
  currentPrice?: HistoricalPrice;
  playerLedger: HistoricalLedger;
  handleTrade: (sharePrice: number, shareCount: number) => void;
};

const Container = styled(
  Block,
  () =>
  {
    return {
      height: "0%",
      width: "100%",
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  },
);

const FullTable = styled(
  StyledTable,
  () =>
  {
    return {
      height: "100%",
      width: "100%",
      flexGrow: 1,
    };
  },
);

const HeadCell = styled(
  StyledHeadCell,
  ({ $theme }) =>
  {
    return { ...$theme.typography.LabelSmall };
  },
);

const RightAlignedCell = styled(
  StyledCell,
  ({ $theme }) =>
  {
    return {
      display: "flex",
      justifyContent: "flex-end",
      height: "100%",
      borderRight: `1px solid ${$theme.colors.borderOpaque}`,
      ":last-of-type": { borderRight: 0 },
    };
  },
);

const StickyFooter = styled(
  StyledRow,
  ({ $theme }) =>
  {
    return {
      backgroundColor: $theme.colors.backgroundAlt,
      width: "100%",
    };
  },
);

const CurrentTrades: React.FC<Pick<Props, "currentTrade" | "currentPrice" | "handleTrade">> = ({
  currentTrade,
  currentPrice,
  handleTrade,
}) =>
{
  if (!currentTrade)
  {
    return null;
  }

  return (
    <TradeRow
      handleTrade={handleTrade}
      sharePrice={currentPrice?.close}
      trade={currentTrade}
    />
  );
};

const PastTrades: React.FC<Pick<Props, "pastTrades">> = ({ pastTrades }) =>
{
  return (
    <>
      {
        pastTrades.map((
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
        })
      }
    </>
  );
};

const TradeHistory: React.FC<Props> = ({
  pastTrades,
  playerLedger,
  currentTrade,
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
          <CurrentTrades
            currentTrade={currentTrade}
            currentPrice={currentPrice}
            handleTrade={handleTrade}
          />
          <PastTrades pastTrades={pastTrades} />
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
