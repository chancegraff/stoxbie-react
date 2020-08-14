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
  shareCount: number;
  shareModifier?: number;
  handleTrade: (sharePrice: number, shareCount: number) => void;
  handleToggle?: () => void;
};

const TradeAction: React.FC<Props> = (
  {
    children,
    handleTrade,
    handleToggle,
    sharePrice,
    shareCount,
    shareModifier = 1,
    Component = Button,
  },
) =>
{
  const handleClick = useCallback(
    () =>
    {
      if (shareCount > 0)
      {
        const count = Math.abs(
          shareCount,
        ) * shareModifier;

        handleTrade(
          sharePrice,
          count,
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
      shareCount,
      shareModifier,
    ],
  );

  return (
    <Component onClick={handleClick}>
      {children}
    </Component>
  );
};

export default TradeAction;
