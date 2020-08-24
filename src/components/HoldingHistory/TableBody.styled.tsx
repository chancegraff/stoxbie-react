import React from "react";
import {
  JSXTableBodyProps,
  TableBody,
} from "grommet";

export const StyledTableBody: React.FC<JSXTableBodyProps> = (
  props,
) =>
{
  return (
    <TableBody
      {...props}
    />
  );
};
