import React, {
  forwardRef,
} from "react";
import {
  JSXTableCellProps,
  JSXTableRowProps,
  TableCell,
  TableRow,
} from "grommet";
import {
  normalizeColor,
} from "grommet/utils";
import styled from "styled-components/macro";

const HoverableTableRow: React.FC<JSXTableRowProps> = styled(
  TableRow,
)`
color: ${
  (
    props,
  ) =>
  {
    return normalizeColor(
      props.theme.global.colors["text-strong"],
      props.theme,
    );
  }
};

&:hover {
  cursor: default;
}
`;

export const StyledTableRow: React.FC<JSXTableRowProps> = forwardRef(
  (
    props,
    ref,
  ) =>
  {
    return (
      <HoverableTableRow
        ref={ref}
        {...props}
      />
    );
  },
);

export const StyledTableCell: React.FC<JSXTableCellProps> = (
  props,
) =>
{
  return (
    <TableCell
      css=""
      border={
        {
          size: "0",
        }
      }
      align="end"
      background={
        {
          color: "brand",
          opacity: "medium",
        }
      }
      {...props}
    />
  );
};
