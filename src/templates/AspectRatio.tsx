import React, {
  forwardRef,
} from "react";
import {
  Box,
} from "grommet";
import styled from "styled-components";

const StyledItem = styled(
  Box,
)`
position: absolute;
left: 0px;
bottom: 0px;
right: 0px;
top: 0px;
`;

export const AspectRatioItem = forwardRef<HTMLElement, BoxProps>(
  (
    props,
    ref,
  ) =>
  {
    return (
      <StyledItem
        ref={ref}
        fill={true}
        justify="center"
        align="center"
        {...props}
      />
    );
  },
);

const StyledBox = styled(
  Box,
)`
position: relative;
`;

export const AspectRatioBox = forwardRef<HTMLElement, BoxProps>(
  (
    props,
    ref,
  ) =>
  {
    return (
      <StyledBox
        ref={ref}
        height="0"
        pad={
          {
            bottom: "67.5%",
          }
        }
        {...props}
      />
    );
  },
);
