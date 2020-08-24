import React from "react";
import {
  JSXTableHeaderProps,
  TableHeader,
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
