import React, {
  useCallback, useMemo,
} from "react";
import {
  Button,
  ButtonProps,
} from "grommet";

import TradeActionCheck from "./TradeActionEnhancer";

type Props = PropsWithChildren & ButtonProps & {
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
    EndEnhancer,
    ...props
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
    <Button
      gap="small"
      label={children}
      icon={endEnhancer}
      onClick={handleClick}
      {...props}
    />
  );
};

export default TradeAction;
