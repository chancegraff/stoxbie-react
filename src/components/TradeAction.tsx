import React, {
  useCallback,
} from "react";
import {
  Button,
  ButtonProps,
} from "baseui/dist/button";

type Props = PropsWithChildren & {
  Component?: React.FC<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
  sharePrice: number;
  purchaseAmount: number;
  handleTrade: (sharePrice: number, shareCount: number) => void;
  handleToggle?: () => void;
};

const TradeAction: React.FC<Props> = (
  {
    children,
    handleTrade,
    handleToggle,
    sharePrice,
    purchaseAmount,
    Component = Button,
  },
) =>
{
  const handleClick = useCallback(
    () =>
    {
      if (purchaseAmount > 0)
      {
        handleTrade(
          sharePrice,
          purchaseAmount,
        );
      }
      else if (handleToggle)
      {
        handleToggle();
      }
    },
    [
      handleTrade,
      handleToggle,
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
