import React, { useMemo, useState, useCallback } from "react";
import { HistoricalPrice } from "iex";
import { Slider, State } from "baseui/dist/slider";
import { Spinner } from "baseui/dist/spinner";
import { Button } from "baseui/dist/button";
import { styled, useStyletron } from "baseui/dist";
import { FlexGridItem } from "baseui/dist/flex-grid";
import { Block } from "baseui/dist/block";
import FlexGrid from "components/BaseUI/FlexGrid";

type Props = {
  price?: HistoricalPrice;
  balance?: number;
};

const FullButton = styled(Button, { width: "100%" });

const Container = styled(Block, ({ $theme }) => ({
  margin: `${$theme.sizing.scale800} 0`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
}));

const TradeControl: React.FC<Props> = ({ price, balance = 10000 }) => {
  const [purchaseAmount, setPurchaseAmount] = useState<number[]>([0]);
  const maxPurchasable = useMemo(
    () => price && Math.floor(balance / price.close),
    [price, balance]
  );
  const handleChange = useCallback((event: State) => {
    setPurchaseAmount(event.value);
  }, []);
  if (!price) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }
  return (
    <Container>
      <Slider
        max={maxPurchasable}
        value={purchaseAmount}
        onChange={handleChange}
      />
      <FlexGrid>
        <FlexGridItem>
          <FullButton>Buy</FullButton>
        </FlexGridItem>
        <FlexGridItem>
          <FullButton>Sell</FullButton>
        </FlexGridItem>
      </FlexGrid>
    </Container>
  );
};

export default TradeControl;
