import React from "react";
import {
  JSXTableBodyProps,
  JSXTableCellProps,
  TableBody,
  TableCell,
} from "grommet";
import styled from "styled-components/macro";

const BorderlessBody: React.FC<JSXTableBodyProps> = styled(
  TableBody,
)`
& td:first-of-type {
  border-left: 0px;
}

& td:last-of-type {
  border-right: 0px;
}
`;

export const GrommetTableBody: React.FC<JSXTableBodyProps> = (
  props,
) =>
{
  return (
    <BorderlessBody
      {...props}
    />
  );
};

export const GrommetTableCell: React.FC<JSXTableCellProps> = (
  props,
) =>
{
  return (
    <TableCell
      fill={true}
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
