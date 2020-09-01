import React from "react";
import {
  JSXTableBodyProps,
  TableBody,
} from "grommet";
import {
  normalizeColor,
} from "grommet/utils";
import styled from "styled-components/macro";

const BorderlessBody: React.FC<JSXTableBodyProps> = styled(
  TableBody,
)`
color: ${
  (
    props,
  ) =>
  {
    return normalizeColor(
      props.theme.global.colors.text,
      props.theme,
    );
  }
};

& td:first-of-type {
  border-left: 0px;
}

& td:last-of-type {
  border-right: 0px;
}

& tr:nth-of-type(odd) td {
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
