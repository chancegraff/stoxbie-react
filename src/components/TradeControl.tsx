import React, {
  useCallback,
  useState,
} from "react";
import {
  Check,
} from "baseui/dist/icon";
import {
  Box,
  Grid,
} from "grommet";
import {
  HistoricalPrice,
} from "iex";

import Spinner from "components/BaseUI/Spinner";
import TradeAction from "components/TradeAction";
import TradeSlider from "components/TradeSlider";

import {
  Container,
  FullButton,
} from "./TradeControl.styled";

type Props = {
  currentPrice?: HistoricalPrice;
  currentLedger?: HistoricalLedger;
  handleTrade: (sharePrice: number, shareCount: number) => void;
};

const TradeControl: React.FC<Props> = (
  {
    currentPrice,
    currentLedger,
    handleTrade,
  },
) =>
{
  const [
    shareCount,
    setShareAmount,
  ] = useState<number>(
    0,
  );
  const [
    shareModifier,
    setShareModifier,
  ] = useState<1 | -1>(
    1,
  );

  const handleToggle = useCallback(
    () =>
    {
      setShareAmount(
        0,
      );

      if (shareModifier > 0)
      {
        setShareModifier(
          -1,
        );
      }
      else
      {
        setShareModifier(
          1,
        );
      }
    },
    [
      shareModifier,
    ],
  );

  if (!currentPrice || !currentLedger)
  {
    return <Spinner container={Container} />;
  }

  return (
    <Container>
      <TradeSlider
        currentLedger={currentLedger}
        currentPrice={currentPrice}
        shareCount={shareCount}
        shareModifier={shareModifier}
        setShareAmount={setShareAmount}
      />
      <Grid
        responsive={true}
        fill="horizontal"
        gap="small"
        columns={
          {
            count: 2,
            size: "auto",
          }
        }
        areas={
          [
            [
              "buy",
              "sell",
            ],
          ]
        }
      >
        <Box gridArea="buy">
          <TradeAction
            Component={FullButton}
            EndEnhancer={Check}
            handleToggle={handleToggle}
            handleTrade={handleTrade}
            shareCount={shareCount}
            sharePrice={currentPrice.close}
            shareModifier={shareModifier}
            actionModifier={1}
          >
              Buy
          </TradeAction>
        </Box>
        <Box gridArea="sell">
          <TradeAction
            Component={FullButton}
            EndEnhancer={Check}
            handleToggle={handleToggle}
            handleTrade={handleTrade}
            shareCount={shareCount}
            sharePrice={currentPrice.close}
            shareModifier={shareModifier}
            actionModifier={-1}
          >
            Sell
          </TradeAction>
        </Box>
      </Grid>
    </Container>
  );
};

export default TradeControl;
