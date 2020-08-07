import React, { useState } from "react";
import {
  styled, useStyletron,
} from "baseui/dist";
import { Block } from "baseui/dist/block";
import { Button } from "baseui/dist/button";
import { FlexGridItem } from "baseui/dist/flex-grid";
import { HistoricalPrice } from "iex";

import FlexGrid from "components/BaseUI/FlexGrid";
import Spinner from "components/BaseUI/Spinner";

import TradeAction from "./TradeAction";
import TradeSlider from "./TradeSlider";

type Props = {
  currentPrice?: HistoricalPrice;
  currentBalance?: number;
  handleTrade: (sharePrice: number, shareCount: number) => void;
};

const Container = styled(
  Block,
  ({ $theme }) =>
  {
    return {
      alignItems: "center",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      margin: `${$theme.sizing.scale800} 0`,
    };
  },
);

const FullButton = styled(
  Button,
  { width: "100%" },
);

const TradeControl: React.FC<Props> = ({
  currentPrice,
  currentBalance,
  handleTrade,
}) =>
{
  const [
    , theme,
  ] = useStyletron();
  const [
    purchaseAmount,
    setPurchaseAmount,
  ] = useState<number>(0);

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
        setPurchaseAmount={setPurchaseAmount}
      />
      <FlexGrid marginTop={theme.sizing.scale400}>
        <FlexGridItem>
          <TradeAction
            Component={FullButton}
            handleTrade={handleTrade}
            purchaseAmount={purchaseAmount}
            purchaseModifier={1}
            sharePrice={currentPrice.close}
          >
            Buy
          </TradeAction>
        </FlexGridItem>
        <FlexGridItem>
          <TradeAction
            Component={FullButton}
            handleTrade={handleTrade}
            purchaseAmount={purchaseAmount}
            purchaseModifier={-1}
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
