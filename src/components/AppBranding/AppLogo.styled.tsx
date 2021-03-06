import React, {
  PropsHasChildren,
} from "react";
import {
  Box,
  Image,
  JSXBoxProps,
  JSXImageProps,
  JSXTextProps,
  Text,
  ThemeContext,
} from "grommet";
import styled from "styled-components/macro";

export const GrommetTheme: React.FC<PropsHasChildren> = (
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

export const GrommetText: React.FC<JSXTextProps> = (
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

export const GrommetImage: React.FC<JSXImageProps> = (
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

export const GrommetContainer: React.FC<JSXBoxProps> = (
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
