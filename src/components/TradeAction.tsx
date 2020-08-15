import React, {
  useCallback, useMemo,
} from "react";
import {
  Button,
  ButtonProps,
} from "baseui/dist/button";

import TradeActionCheck from "./TradeActionEnhancer";

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
    shareModifier = actionModifier,
    Component = Button,
    EndEnhancer,
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
  const endEnhancer = useMemo(
    () =>
    {
      if (EndEnhancer)
      {
        return (
          <TradeActionCheck
            isActive={isActive}
            EndEnhancer={EndEnhancer}
          />
        );
      }
    },
    [
      EndEnhancer,
      isActive,
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
      endEnhancer={endEnhancer}
      onClick={handleClick}
    >
      {children}
    </Component>
  );
};

export default TradeAction;
