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
  pastTrades?: HistoricalTrade[];
  currentTrade?: HistoricalTrade;
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
  {
    display: "flex",
    justifyContent: "flex-end",
  },
);

const StickyFooter = styled(
  StyledRow,
  ({ $theme }) =>
  {
    return {
      backgroundColor: $theme.colors.backgroundAlt,
      borderTop: `1px solid ${$theme.colors.borderOpaque}`,
      width: "100%",
    };
  },
);

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
      return numbro(playerLedger.totalChange).format({
        average: true,
        output: "percent",
      });
    },
    [ playerLedger ],
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

  if (!pastTrades || !currentPrice)
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
            Change
          </HeadCell>
          <HeadCell>
            Balance
          </HeadCell>
        </StyledHead>
        <StyledBody>
          {
            currentTrade &&
              <TradeRow
                handleTrade={handleTrade}
                sharePrice={currentPrice.close}
                trade={currentTrade}
              />
          }
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
