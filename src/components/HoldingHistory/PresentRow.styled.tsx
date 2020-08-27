import React from "react";
import {
  JSXTableCellProps,
  JSXTableRowProps,
  TableCell,
  TableRow,
} from "grommet";
import {
  normalizeColor,
} from "grommet/utils";
import styled from "styled-components";

const HoverableTableRow: React.FC<JSXTableRowProps> = styled(
  TableRow,
)`
box-shadow: ${
  (
    props,
  ) =>
  {
    const color = normalizeColor(
      props.theme.global.colors.background,
      props.theme,
    );

    return `0px 0px 0px 2px ${color}`;
  }
};

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
      border={
        {
          size: "0",
        }
      }
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
