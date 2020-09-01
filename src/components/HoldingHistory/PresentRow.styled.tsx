import React, {
  forwardRef,
} from "react";
import {
  JSXTableRowProps,
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

export const GrommetTableRow: React.FC<JSXTableRowProps> = forwardRef(
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
