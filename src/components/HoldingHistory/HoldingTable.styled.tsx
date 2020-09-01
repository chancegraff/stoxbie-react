import React from "react";
import {
  Box,
  JSXBoxProps,
  JSXTableProps,
  Table,
  ThemeContext,
} from "grommet";
import styled from "styled-components/macro";

export const GrommetTheme: React.FC = (
  props,
) =>
{
  return (
    <ThemeContext.Extend
      value={
        {
          table: {
            header: {
              background: {
                color: "background-front",
              },
              border: undefined,
            },
            body: {
              fill: "vertical",
              border: {
                side: "vertical",
                color: "background-contrast",
              },
            },
            footer: {},
          },
        }
      }
      {...props}
    />
  );
};

const RelativeContainer: React.FC<JSXBoxProps> = styled(
  Box,
)`
position: relative;
padding: 0 2px;
`;

export const GrommetContainer: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <RelativeContainer
      fill="vertical"
      overflow={
        {
          vertical: "auto",
          horizontal: "hidden",
        }
      }
      {...props}
    />
  );
};

const SmallTable: React.FC<JSXTableProps> = styled(
  Table,
)`
min-width: 308px;
font-size: ${
  (
    props,
  ) =>
  {
    return props.theme.text.small.size;
  }
};
line-height: ${
  (
    props,
  ) =>
  {
    return props.theme.text.small.height;
  }
};
`;

export const GrommetTable: React.FC<JSXTableProps> = (
  props,
) =>
{
  return (
    <SmallTable
      {...props}
    />
  );
};
