import React from "react";
import {
  Box,
  Image,
  Text,
  ThemeContext,
} from "grommet";
import styled from "styled-components";

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
    />
  );
};

const LogoText = styled(
  Text,
)`
  letter-spacing: -2px;
  text-transform: uppercase;
`;

export const StyledText: React.FC<TextProps> = (
  props,
) =>
{
  return (
    <LogoText
      size="logo"
      {...props}
    />
  );
};

const InvertedImage = styled(
  Image,
)`
  filter: invert(1);
`;

export const StyledImage: React.FC<ImageProps> = (
  props,
) =>
{
  return (
    <InvertedImage
      fill="vertical"
      margin={
        {
          right: "small",
        }
      }
      {...props}
    />
  );
};

export const StyledContainer: React.FC<BoxProps> = (
  props,
) =>
{
  return (
    <Box
      direction="row"
      height="xxsmall"
      {...props}
    />
  );
};
