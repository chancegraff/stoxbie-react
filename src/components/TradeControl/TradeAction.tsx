import React, {
  useCallback,
  useMemo,
} from "react";
import {
  Checkmark,
} from "grommet-icons";

import {
  StyledButton,
} from "./TradeAction.styled";
import TradeActionCheck from "./TradeActionEnhancer";

type Props = ButtonProps & {
  Icon?: React.ComponentType<IconProps>;
  sharePrice: number;
  shareCount: number;
  actionModifier: 1 | -1;
  shareModifier?: 1 | -1;
  handleTrade: (sharePrice: number, shareCount: number) => void;
  handleToggle?: () => void;
};

export type TradeActionProps = Props;

const TradeAction: React.FC<Props> = (
  {
    children,
    handleTrade,
    handleToggle,
    sharePrice,
    shareCount,
    actionModifier,
    shareModifier = actionModifier,
    Icon,
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
      if (Icon)
      {
        return (
          <TradeActionCheck
            isActive={isActive}
            Icon={Checkmark}
          />
        );
      }
    },
    [
      Icon,
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
    <StyledButton
      label={children}
      icon={endEnhancer}
      onClick={handleClick}
      {...props}
    />
  );
};

export default TradeAction;
