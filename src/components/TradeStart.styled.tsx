import React, {
  forwardRef,
} from "react";
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Text,
  TextProps,
} from "grommet";
import styled from "styled-components";

export const StyledContainer: React.FC<BoxProps & Omit<JSX.IntrinsicElements["div"], "ref">> = forwardRef<HTMLDivElement>(
  (
    props,
    ref,
  ) =>
  {
    return (
      <Box
        ref={ref}
        width="xsmall"
        direction="row"
        {...props}
      />
    );
  },
);

export const StyledText: React.FC<TextProps & Omit<JSX.IntrinsicElements["span"], "color" | "ref">> = forwardRef<HTMLSpanElement>(
  (
    props,
    ref,
  ) =>
  {
    return (
      <Text
        ref={ref}
        size="xsmall"
        {...props}
      />
    );
  },
);

export const GroupedButton = styled(
  Button,
)`
padding: 4px 0px;
border-radius: 0px;

&:first-child {
  padding: 0 0 0 8px;
  border-radius: 25px 0px 0px 25px;
}

&:last-child {
  padding: 0 8px 0 0;
  border-radius: 0px 25px 25px 0px;
}

&:hover {
  span {
    font-weight: bold;
  }

  path {
    stroke-width: 3px;
  }
}
`;

export const StyledButton: React.FC<ButtonProps & Omit<JSX.IntrinsicElements["button"], "color" | "ref">> = forwardRef(
  (
    props,
    ref,
  ) =>
  {
    return (
      <GroupedButton
        ref={ref}
        primary={true}
        fill="horizontal"
        {...props}
      >
        <Box
          align="center"
          justify="center"
          fill="horizontal"
        >
          <StyledText>
            {props.children}
          </StyledText>
        </Box>
      </GroupedButton>
    );
  },
);
