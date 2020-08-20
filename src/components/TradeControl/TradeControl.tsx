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
import TradeAction from "components/TradeControl/TradeAction";
import TradeSlider from "components/TradeControl/TradeSlider";

import {
  Container,
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
        rows={
          [
            "auto",
          ]
        }
        columns={
          [
            "auto",
            "auto",
          ]
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
            EndEnhancer={Check}
            handleToggle={handleToggle}
            handleTrade={handleTrade}
            shareCount={shareCount}
            sharePrice={currentPrice.close}
            shareModifier={shareModifier}
            actionModifier={1}
            primary={true}
            size="medium"
          >
              Buy
          </TradeAction>
        </Box>
        <Box gridArea="sell">
          <TradeAction
            EndEnhancer={Check}
            handleToggle={handleToggle}
            handleTrade={handleTrade}
            shareCount={shareCount}
            sharePrice={currentPrice.close}
            shareModifier={shareModifier}
            actionModifier={-1}
            primary={true}
            size="medium"
          >
            Sell
          </TradeAction>
        </Box>
      </Grid>
    </Container>
  );
};

export default TradeControl;
