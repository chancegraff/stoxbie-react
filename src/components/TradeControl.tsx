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
  currentBalance?: number;
  handleTrade: (sharePrice: number, shareCount: number) => void;
};

const TradeControl: React.FC<Props> = (
  {
    currentPrice,
    currentBalance,
    handleTrade,
  },
) =>
{
  const [
    ,
    theme,
  ] = useStyletron();
  const [
    purchaseAmount,
    setPurchaseAmount,
  ] = useState<number>(
    0,
  );
  const [
    purchaseModifier,
    setPurchaseModifier,
  ] = useState<number>(
    1,
  );

  const handleToggle = useCallback(
    () =>
    {
      if (purchaseModifier > 0)
      {
        setPurchaseModifier(
          -1,
        );
      }
      else
      {
        setPurchaseModifier(
          1,
        );
      }
    },
    [
      purchaseModifier,
    ],
  );

  if (!currentPrice || !currentBalance)
  {
    return <Spinner container={Container} />;
  }

  return (
    <Container>
      <TradeSlider
        currentBalance={currentBalance}
        currentPrice={currentPrice}
        purchaseAmount={purchaseAmount}
        purchaseModifier={purchaseModifier}
        setPurchaseAmount={setPurchaseAmount}
      />
      <FlexGrid marginTop={theme.sizing.scale400}>
        <FlexGridItem>
          <TradeAction
            Component={FullButton}
            handleToggle={handleToggle}
            handleTrade={handleTrade}
            purchaseAmount={purchaseAmount}
            sharePrice={currentPrice.close}
          >
            Buy
          </TradeAction>
        </FlexGridItem>
        <FlexGridItem>
          <TradeAction
            Component={FullButton}
            handleToggle={handleToggle}
            handleTrade={handleTrade}
            purchaseAmount={purchaseAmount}
            sharePrice={currentPrice.close}
          >
            Sell
          </TradeAction>
        </FlexGridItem>
      </FlexGrid>
    </Container>
  );
};

export default TradeControl;
