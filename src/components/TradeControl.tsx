import { styled } from "baseui/dist";
import { Block } from "baseui/dist/block";
import { Button } from "baseui/dist/button";
import { FlexGridItem } from "baseui/dist/flex-grid";
import { Slider, State } from "baseui/dist/slider";
import FlexGrid from "components/BaseUI/FlexGrid";
import Spinner from "components/BaseUI/Spinner";
import { HistoricalPrice } from "iex";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePrevious } from "services/Utilities";

type Props = {
  price?: HistoricalPrice;
  balance?: number;
};

const FullButton = styled(
  Button,
  {
    width: "100%",
  },
);

const Container = styled(
  Block,
  (
    {
      $theme,
    },
  ) => ({
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: `${$theme.sizing.scale800} 0`,
  }),
);

const TradeControl: React.FC<Props> = (
  {
    price, balance = 10000,
  },
) => {
  const [
    purchaseAmount,
    setPurchaseAmount,
  ] = useState<number[]>(
    [0],
  );
  const previousPrice = usePrevious(
    price,
  );
  const maxPurchasable = useMemo(
    () => price ? Math.floor(
      balance / price.close,
    ) : 0,
    [
      price,
      balance,
    ],
  );
  const handleChange = useCallback(
    (
      event: State,
    ) => {
      setPurchaseAmount(
        event.value,
      );
    },
    [],
  );

  useEffect(
    () => {
      if (price && previousPrice && price !== previousPrice) {
        setPurchaseAmount(
          [0],
        );
      }
    },
    [
      price,
      previousPrice,
    ],
  );

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
          <FullButton>{"Buy"}</FullButton>
        </FlexGridItem>
        <FlexGridItem>
          <FullButton>{"Sell"}</FullButton>
        </FlexGridItem>
      </FlexGrid>
    </Container>
  );
};

export default TradeControl;
