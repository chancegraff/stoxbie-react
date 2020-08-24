import React from "react";
import {
  JSXTableProps, Table,
} from "grommet";

export const StyledTable: React.FC<JSXTableProps> = (
  props,
) =>
{
  return (
    <Table
      {...props}
    />
  );
};
