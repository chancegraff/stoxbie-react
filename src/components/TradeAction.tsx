import React, { useCallback } from "react";
import { styled } from "baseui/dist";
import { Button } from "baseui/dist/button";
import { HistoricalPrice } from "iex";

  type Props = PropsWithChildren & {
    modifier: 1 | -1;
    price: HistoricalPrice;
    purchaseAmount: number;
    handleTrade: (sharePrice: number, shareCount: number) => void;
  };

const FullButton = styled(
  Button,
  { width: "100%" },
);

const TradeAction: React.FC<Props> = ({
  children,
  handleTrade,
  modifier,
  price,
  purchaseAmount,
}) =>
{
  const handleClick = useCallback(
    () =>
    {
      if (price)
      {
        const shareCount = Math.abs(purchaseAmount) * modifier;

        handleTrade(
          price.close,
          shareCount,
        );
      }
    },
    [
      handleTrade,
      modifier,
      price,
      purchaseAmount,
    ],
  );

  return (
    <FullButton onClick={handleClick}>
      {children}
    </FullButton>
  );
};

export default TradeAction;
