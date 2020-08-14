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
    Component = Button,
  },
) =>
{
  const handleClick = useCallback(
    () =>
    {
      if (shareCount > 0)
      {
        handleTrade(
          sharePrice,
          shareCount,
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
    ],
  );

  return (
    <Component onClick={handleClick}>
      {children}
    </Component>
  );
};

export default TradeAction;
