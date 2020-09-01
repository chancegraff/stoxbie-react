import React from "react";
import {
  JSXTableCellProps,
  JSXTableHeaderProps,
  JSXTableRowProps,
  TableCell,
  TableHeader,
  TableRow,
} from "grommet";
import styled from "styled-components/macro";

export const StyledTableHeader: React.FC<JSXTableHeaderProps> = (
  props,
) =>
{
  return (
    <TableHeader
      css=""
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
      css=""
      {...props}
    />
  );
};

const StickyTableCell: React.FC<JSXTableHeaderProps> = styled(
  TableCell,
)`
position: sticky;
top: 0;
`;

export const StyledTableCell: React.FC<JSXTableCellProps> = (
  props,
) =>
{
  return (
    <StickyTableCell
      plain={true}
      scope="col"
      {...props}
    />
  );
};
