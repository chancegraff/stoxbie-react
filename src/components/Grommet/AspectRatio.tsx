import React, {
  forwardRef,
} from "react";
import {
  Box,
  JSXBoxProps,
} from "grommet";
import styled from "styled-components/macro";

const GrommetItem = styled(
  Box,
)`
position: absolute;
left: 0px;
bottom: 0px;
right: 0px;
top: 0px;
`;

export const AspectRatioItem = forwardRef<HTMLElement, JSXBoxProps>(
  (
    props,
    ref,
  ) =>
  {
    return (
      <GrommetItem
        ref={ref}
        css=""
        fill={true}
        justify="center"
        align="center"
        {...props}
      />
    );
  },
);

const GrommetBox = styled(
  Box,
)`
position: relative;
`;

export const AspectRatioBox = forwardRef<HTMLElement, JSXBoxProps>(
  (
    props,
    ref,
  ) =>
  {
    return (
      <GrommetBox
        ref={ref}
        css=""
        height="0"
        fill="horizontal"
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
