import React from "react";
import {
  JSXTableProps, Table, ThemeContext,
} from "grommet";
import styled from "styled-components";

export const StyledTheme: React.FC = (
  props,
) =>
{
  return (
    <ThemeContext.Extend
      value={
        {
          global: {
            font: {
              size: "12px",
              height: "16px",
            },
          },
          text: {
            medium: {
              size: "12px",
              height: "16px",
            },
          },
          paragraph: {
            medium: {
              size: "12px",
              height: "16px",
            },
          },
          table: {
            font: {
              size: "12px",
              height: "16px",
            },
            header: {
              background: {
                color: "background-front",
              },
              font: {
                size: "12px",
                height: "16px",
              },
              border: undefined,
            },
            body: {},
            footer: {},
            // body: {
            //   align: 'center',
            //   pad: { horizontal: 'large', vertical: 'xsmall' },
            //   border: 'horizontal',
            // },
            // extend: () => `font-family: Arial`,
            // footer: {
            //   align: 'start',
            //   border: undefined,
            //   pad: { horizontal: 'large', vertical: 'small' },
            //   verticalAlign: 'bottom',
            // },
            // header: {
            //   align: 'center',
            //   border: 'bottom',
            //   fill: 'horizontal',
            //   pad: { horizontal: 'large', vertical: 'xsmall' },
            //   verticalAlign: 'bottom',
            //   background: {
            //     color: 'accent-1',
            //     opacity: 'strong',
            //   },
            // },
          },
        }
      }
      {...props}
    />
  );
};

const SmallTable: React.FC<JSXTableProps> = styled(
  Table,
)`
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

export const StyledTable: React.FC<JSXTableProps> = (
  props,
) =>
{
  return (
    <SmallTable
      {...props}
    />
  );
};
