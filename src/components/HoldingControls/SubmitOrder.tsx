import React, {
  useCallback,
  useMemo,
} from "react";
import {
  JSXButtonProps,
} from "grommet";
import {
  JSXIconProps,
} from "grommet-icons";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import StateIcon from "./StateIcon";
import {
  GrommetButton,
} from "./SubmitOrder.styled";

type Props = JSXButtonProps & {
  Icon?: React.ComponentType<JSXIconProps>;
  presentPriceClose: number;
  orderShareCount: number;
  orderDirection: 1 | -1;
  submitDirection?: 1 | -1;
  handleSubmit: (sharePrice: number, shareCount: number) => void;
  handleToggle?: () => void;
};

export type SubmitOrderProps = Props;

const SubmitOrder: React.FC<Props> = (
  {
    children,
    disabled,
    handleSubmit,
    handleToggle,
    presentPriceClose,
    orderShareCount,
    orderDirection,
    submitDirection = orderDirection,
    Icon,
    ...props
  },
) =>
{
  const isActive = useMemo(
    () =>
    {
      return (
        !disabled &&
        submitDirection === orderDirection
      );
    },
    [
      disabled,
      submitDirection,
      orderDirection,
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
            Icon={Icon}
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
      if (orderShareCount > 0 &&
          isActive)
      {
        const count = Math.abs(
          orderShareCount,
        ) * orderDirection;

        handleSubmit(
          presentPriceClose,
          count,
        );
      }
      else if (!isActive &&
               handleToggle)
      {
        handleToggle();
      }
    },
    [
      handleSubmit,
      handleToggle,
      isActive,
      presentPriceClose,
      orderShareCount,
      orderDirection,
    ],
  );

  return (
    <GrommetButton
      css=""
      disabled={disabled}
      icon={endEnhancer}
      label={children}
      value={submitDirection}
      onClick={handleClick}
      {...props}
    />
  );
};

export default SubmitOrder;
