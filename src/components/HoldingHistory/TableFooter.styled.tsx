import React from "react";
import {
  JSXTableFooterProps,
  TableFooter,
} from "grommet";
import styled from "styled-components";

const StickyFooter: React.FC<JSXTableFooterProps> = styled(
  TableFooter,
)`
position: sticky;
bottom: 0;
`;

export const StyledTableFooter: React.FC<JSXTableFooterProps> = (
  props,
) =>
{
  return (
    <StickyFooter
      {...props}
    />
  );
};
