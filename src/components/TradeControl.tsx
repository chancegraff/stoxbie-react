import React, { useMemo, useState, useCallback, useEffect } from "react";
import { HistoricalPrice } from "iex";
import { Slider, State } from "baseui/dist/slider";
import { FlexGridItem } from "baseui/dist/flex-grid";
import { Button } from "baseui/dist/button";
import { Block } from "baseui/dist/block";
import { styled } from "baseui/dist";
import { usePrevious } from "services/Utilities";
import FlexGrid from "components/BaseUI/FlexGrid";
import Spinner from "components/BaseUI/Spinner";

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
  const previousPrice = usePrevious(price);
  const maxPurchasable = useMemo(
    () => (price ? Math.floor(balance / price.close) : 0),
    [price, balance]
  );
  const handleChange = useCallback((event: State) => {
    setPurchaseAmount(event.value);
  }, []);

  useEffect(() => {
    if (price && previousPrice && price !== previousPrice) {
      setPurchaseAmount([0]);
    }
  }, [price, previousPrice]);

  if (!price) {
    return <Spinner container={Container} />;
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
