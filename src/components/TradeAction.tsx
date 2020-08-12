import React, {
  useCallback,
} from "react";
import {
  Button,
  ButtonProps,
} from "baseui/dist/button";

type Props = PropsWithChildren & {
  purchaseModifier: 1 | -1;
  sharePrice: number;
  purchaseAmount: number;
  handleTrade: (sharePrice: number, shareCount: number) => void;
  Component?: React.FC<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
};

const TradeAction: React.FC<Props> = (
  {
    children,
    handleTrade,
    purchaseModifier,
    sharePrice,
    purchaseAmount,
    Component = Button,
  },
) =>
{
  const handleClick = useCallback(
    () =>
    {
      if (sharePrice)
      {
        const count = Math.abs(
          purchaseAmount,
        ) * purchaseModifier;

        handleTrade(
          sharePrice,
          count,
        );
      }
    },
    [
      handleTrade,
      purchaseModifier,
      sharePrice,
      purchaseAmount,
    ],
  );

  return (
    <Component onClick={handleClick}>
      {children}
    </Component>
  );
};

export default TradeAction;
