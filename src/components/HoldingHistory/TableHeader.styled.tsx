import React from "react";
import {
  JSXTableCellProps,
  JSXTableHeaderProps,
  JSXTableRowProps,
  TableCell,
  TableHeader,
  TableRow,
} from "grommet";
import styled from "styled-components";

const StickyHeader: React.FC<JSXTableHeaderProps> = styled(
  TableHeader,
)`
position: sticky;
top: 0;
`;

export const StyledTableHeader: React.FC<JSXTableHeaderProps> = (
  props,
) =>
{
  return (
    <StickyHeader
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
