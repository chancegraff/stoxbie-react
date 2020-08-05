import React, { useCallback, useEffect, useMemo, useState } from "react";
import { styled } from "baseui/dist";
import { Block } from "baseui/dist/block";
import { Button } from "baseui/dist/button";
import { FlexGridItem } from "baseui/dist/flex-grid";
import { Slider, State } from "baseui/dist/slider";
import { HistoricalPrice } from "iex";

import { usePrevious } from "services/Utilities";
import FlexGrid from "components/BaseUI/FlexGrid";
import Spinner from "components/BaseUI/Spinner";

type Props = {
  price?: HistoricalPrice;
  balance?: number;
  handleTrade: (balance: number, close: number, shareCount: number) => void;
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
  ) => {
    return {
      alignItems: "center",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      margin: `${$theme.sizing.scale800} 0`,
    };
  },
);

const TradeControl: React.FC<Props> = (
  {
    price,
    balance,
    handleTrade,
  },
) => {
  const [
    purchaseAmount,
    setPurchaseAmount,
  ] = useState<number>(
    0,
  );
  const previousPrice = usePrevious(
    price,
  );
  const previousBalance = usePrevious(
    balance,
  );
  const hasPriceChanged = useMemo(
    () => {
      return (
        price &&
        previousPrice &&
        price !== previousPrice
      );
    },
    [
      price,
      previousPrice,
    ],
  );
  const hasBalanceChanged = useMemo(
    () => {
      return (
        balance &&
        previousBalance &&
        balance !== previousBalance
      );
    },
    [
      balance,
      previousBalance,
    ],
  );
  const maxPurchasable = useMemo(
    () => {
      return balance && price ?
        Math.floor(
          balance / price.close,
        ) :
        0;
    },
    [
      price,
      balance,
    ],
  );
  const handleChange = useCallback(
    (
      event: State,
    ) => {
      const [
        nextPurchaseAmount,
      ] = event.value;

      setPurchaseAmount(
        nextPurchaseAmount,
      );
    },
    [],
  );
  const handleBuy = useCallback(
    () => {
      if (price && balance) {
        const shareCount = Math.abs(
          purchaseAmount,
        );

        handleTrade(
          balance,
          price.close,
          shareCount,
        );
      }
    },
    [
      handleTrade,
      purchaseAmount,
      balance,
      price,
    ],
  );
  const handleSell = useCallback(
    () => {
      if (price && balance) {
        const shareCount = Math.abs(
          purchaseAmount,
        ) * -1;

        handleTrade(
          balance,
          price.close,
          shareCount,
        );
      }
    },
    [
      handleTrade,
      purchaseAmount,
      balance,
      price,
    ],
  );

  useEffect(
    () => {
      if (hasPriceChanged || hasBalanceChanged) {
        setPurchaseAmount(
          0,
        );
      }
    },
    [
      hasPriceChanged,
      hasBalanceChanged,
    ],
  );

  if (!price) {
    return <Spinner container={Container} />;
  }

  return (
    <Container>
      <Slider
        max={maxPurchasable}
        onChange={handleChange}
        value={[
          purchaseAmount,
        ]}
      />
      <FlexGrid>
        <FlexGridItem>
          <FullButton onClick={handleBuy}>
            Buy
          </FullButton>
        </FlexGridItem>
        <FlexGridItem>
          <FullButton onClick={handleSell}>
            Sell
          </FullButton>
        </FlexGridItem>
      </FlexGrid>
    </Container>
  );
};

export default TradeControl;
