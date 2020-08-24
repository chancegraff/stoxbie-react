import React from "react";
import {
  JSXTableCellProps,
  JSXTableHeaderProps,
  JSXTableRowProps,
  TableCell,
  TableHeader,
  TableRow,
} from "grommet";

export const StyledTableHeader: React.FC<JSXTableHeaderProps> = (
  props,
) =>
{
  return (
    <TableHeader
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

export const StyledTableHeadCell: React.FC<JSXTableCellProps> = (
  props,
) =>
{
  return (
    <TableCell
      scope="col"
      {...props}
    />
  );
};
