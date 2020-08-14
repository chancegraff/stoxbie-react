import React, {
  useCallback,
  useState,
} from "react";
import {
  useStyletron,
} from "baseui/dist";
import {
  FlexGridItem,
} from "baseui/dist/flex-grid";
import {
  Check,
} from "baseui/dist/icon";
import {
  HistoricalPrice,
} from "iex";

import FlexGrid from "components/BaseUI/FlexGrid";
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
    ,
    theme,
  ] = useStyletron();
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
      <FlexGrid marginTop={theme.sizing.scale400}>
        <FlexGridItem>
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
        </FlexGridItem>
        <FlexGridItem>
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
        </FlexGridItem>
      </FlexGrid>
    </Container>
  );
};

export default TradeControl;
