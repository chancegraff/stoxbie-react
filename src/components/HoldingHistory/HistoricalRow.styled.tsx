import React from "react";
import {
  JSXTableRowProps,
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
