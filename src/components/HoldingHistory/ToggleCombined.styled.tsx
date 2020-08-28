import React from "react";
import {
  Box,
  Drop,
  JSXBoxProps,
  JSXDropProps,
} from "grommet";
import {
  JSXIconProps,
  Layer,
  Stop,
} from "grommet-icons";
import styled from "styled-components";

export const StyledDrop: React.FC<JSXDropProps> = (
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
&:hover {
  cursor: pointer;
}
`;

export const StyledContainer: React.FC<JSXBoxProps> = (
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

export const StyledOpenedIcon: React.FC<JSXIconProps> = (
  props,
) =>
{
  return (
    <Layer size="12px" />
  );
};

export const StyledClosedIcon: React.FC<JSXIconProps> = (
  props,
) =>
{
  return (
    <Stop size="12px" />
  );
};
