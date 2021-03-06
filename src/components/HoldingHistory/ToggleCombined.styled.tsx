import React from "react";
import {
  Box,
  Drop,
  JSXBoxProps,
  JSXDropProps,
} from "grommet";
import {
  JSXIconProps,
  Stop,
  Subtract,
} from "grommet-icons";
import styled from "styled-components/macro";

export const GrommetDrop: React.FC<JSXDropProps> = (
  props,
) =>
{
  return (
    <Drop
      stretch={false}
      elevation="medium"
      plain={true}
      align={
        {
          right: "left",
        }
      }
      {...props}
    />
  );
};

const HoverableContainer: React.FC<JSXBoxProps> = styled(
  Box,
)`
cursor: pointer;

& > * {
  cursor: pointer;
  pointer-events: none;
}
`;

export const GrommetContainer: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <HoverableContainer
      fill={false}
      round="100%"
      pad="small"
      background="brand"
      margin={
        {
          right: "xsmall",
        }
      }
      {...props}
    />
  );
};

export const GrommetExtendingIcon: React.FC<JSXIconProps> = (
  props,
) =>
{
  return (
    <Stop
      size="12px"
      {...props}
    />
  );
};

export const GrommetRetractingIcon: React.FC<JSXIconProps> = (
  props,
) =>
{
  return (
    <Subtract
      size="12px"
      {...props}
    />
  );
};
