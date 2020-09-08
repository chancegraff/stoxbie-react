import React from "react";
import {
  JSXTableCellProps,
  JSXTableFooterProps,
  JSXTableRowProps,
  TableCell,
  TableFooter,
  TableRow,
} from "grommet";
import styled from "styled-components/macro";

export const GrommetTableFooter: React.FC<JSXTableFooterProps> = (
  props,
) =>
{
  return (
    <TableFooter
      {...props}
    />
  );
};

export const GrommetTableRow: React.FC<JSXTableRowProps> = (
  props,
) =>
{
  return (
    <TableRow
      {...props}
    />
  );
};

const StickyTableCell: React.FC<JSXTableCellProps> = styled(
  TableCell,
)`
position: sticky;
bottom: 0;
`;

export const GrommetTableCell: React.FC<JSXTableCellProps> = (
  props,
) =>
{
  return (
    <StickyTableCell
      scope="col"
      plain={true}
      align="end"
      border={
        {
          side: "top",
          size: "0",
        }
      }
      background="background-front"
      {...props}
    />
  );
};
