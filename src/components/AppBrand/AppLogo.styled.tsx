import React, {
  forwardRef,
} from "react";
import {
  Box,
  Image,
  Text,
  ThemeContext,
} from "grommet";
import styled from "styled-components";

import {
  BoxProps,
  ImageProps,
  TextProps,
} from "services/Grommet";

export const ExtendedTheme: React.FC<PropsWithChildren> = (
  props,
) =>
{
  return (
    <ThemeContext.Extend
      {...props}
      value={
        {
          anchor: {
            color: "text-strong",
            fontWeight: 900,
            textDecoration: "none",
            hover: {
              textDecoration: "none",
            },
            extend: () =>
            {
              return `
              font-family: 'Catamaran';
            `;
            },
          },
        }
      }
    >
      {props.children}
    </ThemeContext.Extend>
  );
};

const LogoText = styled(
  Text,
)`
  letter-spacing: -2px;
  text-transform: uppercase;
`;

export const StyledText: React.FC<TextProps> = forwardRef<HTMLSpanElement>(
  (
    props,
    ref,
  ) =>
  {
    return (
      <LogoText
        ref={ref}
        size="logo"
        {...props}
      >
        {props.children}
      </LogoText>
    );
  },
);

const InvertedImage = styled(
  Image,
)`
  filter: invert(1);
`;

export const StyledImage: React.FC<ImageProps> = forwardRef<HTMLImageElement>(
  (
    props,
    ref,
  ) =>
  {
    return (
      <InvertedImage
        ref={ref}
        fill="vertical"
        margin={
          {
            right: "small",
          }
        }
        {...props}
      />
    );
  },
);

export const StyledContainer: React.FC<BoxProps> = forwardRef<HTMLDivElement>(
  (
    props,
    ref,
  ) =>
  {
    return (
      <Box
        ref={ref}
        direction="row"
        height="xxsmall"
      >
        {props.children}
      </Box>
    );
  },
);
