import React, {
  useCallback,
  useMemo,
} from "react";
import {
  JSXButtonProps,
} from "grommet";
import {
  Checkmark,
  JSXIconProps,
} from "grommet-icons";

import StateIcon from "./StateIcon";
import {
  StyledButton,
} from "./SubmitOrder.styled";

type Props = JSXButtonProps & {
  Icon?: React.ComponentType<JSXIconProps>;
  sharePrice: number;
  shareCount: number;
  shareModifier: 1 | -1;
  activeModifier?: 1 | -1;
  handleOrder: (sharePrice: number, shareCount: number) => void;
  handleToggle?: () => void;
};

export type ActionProps = Props;

const HoldingAction: React.FC<Props> = (
  {
    children,
    handleOrder,
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
          <StateIcon
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
        ) * shareModifier;

        handleOrder(
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
      handleOrder,
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

export default HoldingAction;
