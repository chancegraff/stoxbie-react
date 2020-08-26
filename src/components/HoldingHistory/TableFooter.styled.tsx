import React from "react";
import {
  JSXTableCellProps,
  JSXTableFooterProps,
  JSXTableRowProps,
  TableCell,
  TableFooter,
  TableRow,
} from "grommet";
import styled from "styled-components";

const StickyFooter: React.FC<JSXTableFooterProps> = styled(
  TableFooter,
)`
position: sticky;
bottom: 0;
`;

export const StyledTableFooter: React.FC<JSXTableFooterProps> = (
  props,
) =>
{
  return (
    <StickyFooter
      {...props}
    />
  );
};

export const StyledTableRow: React.FC<JSXTableRowProps> = (
  props,
) =>
{
  return (
    <TableRow
      {...props}
    />
  );
};

export const StyledTableCell: React.FC<JSXTableCellProps> = (
  props,
) =>
{
  return (
    <TableCell
      align="end"
      border={
        {
          side: "top",
          size: "0",
        }
      }
      background={
        {
          color: "background-front",
        }
      }
      {...props}
    />
  );
};
