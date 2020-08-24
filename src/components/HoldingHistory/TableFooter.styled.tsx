import React from "react";
import {
  JSXTableFooterProps,
  TableFooter,
} from "grommet";

export const StyledTableFooter: React.FC<JSXTableFooterProps> = (
  props,
) =>
{
  return (
    <TableFooter
      {...props}
    />
  );
};
