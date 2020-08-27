import React from "react";
import {
  JSXTableCellProps,
  JSXTableRowProps,
  TableCell,
  TableRow,
} from "grommet";

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
      background={
        {
          color: "brand",
          opacity: "weak",
        }
      }
      {...props}
    />
  );
};
