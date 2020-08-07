import React from "react";
import { styled } from "baseui/dist";
import { Block } from "baseui/dist/block";
import {
  StyledBody,
  StyledHead,
  StyledHeadCell,
  StyledTable,
} from "baseui/dist/table";
import { HistoricalPrice } from "iex";

import Spinner from "components/BaseUI/Spinner";

import TradeCell from "./TradeCell";

type Props = {
  pastTrades?: HistoricalTrade[];
  currentTrade?: HistoricalTrade;
  currentPrice?: HistoricalPrice;
  handleTrade: (sharePrice: number, shareCount: number) => void;
};

const Container = styled(
  Block,
  () =>
  {
    return {
      alignItems: "center",
      display: "flex",
      flex: "1 0",
      flexWrap: "wrap",
      justifyContent: "center",
      width: "100%",
    };
  },
);

const FullTable = styled(
  StyledTable,
  () =>
  {
    return { width: "100%" };
  },
);

const HeadCell = styled(
  StyledHeadCell,
  ({ $theme }) =>
  {
    return { ...$theme.typography.LabelSmall };
  },
);

const TradeHistory: React.FC<Props> = ({
  pastTrades,
  currentTrade,
  currentPrice,
  handleTrade,
}) =>
{
  if (!pastTrades || !currentPrice)
  {
    return <Spinner container={Container} />;
  }

  return (
    <Container>
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
            <TradeCell
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
                <TradeCell
                  key={index}
                  trade={pastTrade}
                />
              );
            })
          }
        </StyledBody>
      </FullTable>
    </Container>
  );
};

export default TradeHistory;
