import React, {
  useCallback, useMemo,
} from "react";
import {
  Button,
  ButtonProps,
} from "baseui/dist/button";
import {
  Check,
} from "baseui/dist/icon";

import TradeActionCheck from "./TradeActionCheck";

type Props = PropsWithChildren & {
  Component?: React.FC<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
  EndEnhancer?: React.FC;
  sharePrice: number;
  shareCount: number;
  actionModifier: 1 | -1;
  shareModifier?: 1 | -1;
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
    actionModifier,
    shareModifier = 1,
    Component = Button,
    EndEnhancer = Check,
  },
) =>
{
  const isActive = useMemo(
    () =>
    {
      return actionModifier === shareModifier;
    },
    [
      actionModifier,
      shareModifier,
    ],
  );

  const handleClick = useCallback(
    () =>
    {
      if (shareCount > 0 && isActive)
      {
        const count = Math.abs(
          shareCount,
        ) * actionModifier;

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
      isActive,
      sharePrice,
      shareCount,
      actionModifier,
    ],
  );

  return (
    <Component
      endEnhancer={
        (
          <TradeActionCheck
            isActive={isActive}
            EndEnhancer={EndEnhancer}
          />
        )
      }
      onClick={handleClick}
    >
      {children}
    </Component>
  );
};

export default TradeAction;
