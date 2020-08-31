import React from "react";
import {
  JSXTableCellProps,
  JSXTableRowProps,
  TableCell,
  TableRow,
} from "grommet";
import styled from "styled-components/macro";

const HoverableTableRow: React.FC<JSXTableRowProps> = styled(
  TableRow,
)`
&:hover {
  cursor: default;
}
`;

export const StyledTableRow: React.FC<JSXTableRowProps> = (
  props,
) =>
{
  return (
    <HoverableTableRow
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
          color: "background",
          side: "all",
          size: "1px",
        }
      }
      {...props}
    />
  );
};
