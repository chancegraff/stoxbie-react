import React, {
  PropsHasChildren,
  useContext,
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
import styled, {
  ThemeContext as StyledThemeContext,
} from "styled-components/macro";

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

export const GrommetContainer: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <Box
      direction="row"
      align="start"
      {...props}
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
      alignSelf="end"
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
  const theme = useContext(
    StyledThemeContext,
  );

  if (theme.dark)
  {
    return (
      <InvertedImage
        height="64px"
        margin={
          {
            right: "medium",
          }
        }
        {...props}
      />
    );
  }

  return (
    <Image
      height="64px"
      margin={
        {
          right: "medium",
        }
      }
      {...props}
    />
  );
};
