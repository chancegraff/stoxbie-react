import React from "react";
import {
  Box,
  JSXBoxProps,
} from "grommet";
import styled from "styled-components/macro";

const StyledBox = styled(
  Box,
)`
&:hover {
  cursor: pointer;
}
`;

export const StyledTick: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <StyledBox
      overflow="visible"
      width="14px"
      align="center"
      focusIndicator={false}
      {...props}
    />
  );
};
