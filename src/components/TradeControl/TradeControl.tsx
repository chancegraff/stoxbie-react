import React, { useState } from "react";
import {
  styled, useStyletron,
} from "baseui/dist";
import { Block } from "baseui/dist/block";
import { FlexGridItem } from "baseui/dist/flex-grid";
import { HistoricalPrice } from "iex";

import FlexGrid from "components/BaseUI/FlexGrid";
import Spinner from "components/BaseUI/Spinner";

import TradeAction from "./TradeAction";
import TradeSlider from "./TradeSlider";

type Props = {
  price?: HistoricalPrice;
  balance?: number;
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

const TradeControl: React.FC<Props> = ({
  price,
  balance,
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

  if (!price || !balance)
  {
    return <Spinner container={Container} />;
  }

  return (
    <Container>
      <TradeSlider
        balance={balance}
        price={price}
        purchaseAmount={purchaseAmount}
        setPurchaseAmount={setPurchaseAmount}
      />
      <FlexGrid marginTop={theme.sizing.scale400}>
        <FlexGridItem>
          <TradeAction
            handleTrade={handleTrade}
            modifier={1}
            price={price}
            purchaseAmount={purchaseAmount}
          >
            Buy
          </TradeAction>
        </FlexGridItem>
        <FlexGridItem>
          <TradeAction
            handleTrade={handleTrade}
            modifier={-1}
            price={price}
            purchaseAmount={purchaseAmount}
          >
            Sell
          </TradeAction>
        </FlexGridItem>
      </FlexGrid>
    </Container>
  );
};

export default TradeControl;
