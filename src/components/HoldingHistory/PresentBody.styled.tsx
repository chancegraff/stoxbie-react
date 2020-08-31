import React from "react";
import {
  JSXTableBodyProps,
  TableBody,
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

export const StyledTableBody: React.FC<JSXTableBodyProps> = (
  props,
) =>
{
  return (
    <BorderlessBody
      {...props}
    />
  );
};
