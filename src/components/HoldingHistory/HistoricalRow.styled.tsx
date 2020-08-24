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

const AlternativeTableRow: React.FC<JSXTableRowProps> = styled(
  TableRow,
)`
&:nth-child(even) {
  background-color: ${
    (
      props,
    ) =>
    {
      return normalizeColor(
        props.theme.global.colors["background-contrast"],
        props.theme,
      );
    }
  };
}
`;

export const StyledTableRow: React.FC<JSXTableRowProps> = (
  props,
) =>
{
  return (
    <AlternativeTableRow
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
      {...props}
    />
  );
};
