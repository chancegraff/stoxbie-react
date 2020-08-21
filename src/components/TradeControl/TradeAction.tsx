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
  shareModifier: 1 | -1;
  activeModifier?: 1 | -1;
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
    shareModifier,
    activeModifier = shareModifier,
    Icon,
    ...props
  },
) =>
{
  const isActive = useMemo(
    () =>
    {
      return shareModifier === activeModifier;
    },
    [
      shareModifier,
      activeModifier,
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
    (
      event: React.MouseEvent<HTMLButtonElement>,
    ) =>
    {
      if (shareCount > 0 && isActive)
      {
        const count = Math.abs(
          shareCount,
        ) * shareModifier;

        handleTrade(
          sharePrice,
          count,
        );
      }
      else if (!isActive && handleToggle)
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
      shareModifier,
    ],
  );

  return (
    <StyledButton
      icon={endEnhancer}
      label={children}
      value={shareModifier}
      onClick={handleClick}
      {...props}
    />
  );
};

export default TradeAction;
