import React from "react";
import {
  Box, JSXBoxProps,
} from "grommet";
import {
  Catalog, CatalogOption, JSXIconProps,
} from "grommet-icons";
import {
  normalizeColor,
} from "grommet/utils";
import styled from "styled-components";

import SubmitOrder, {
  SubmitOrderProps,
} from "components/HoldingControls/SubmitOrder";

export const StyledSubmitOrder: React.FC<SubmitOrderProps> = (
  props,
) =>
{
  return (
    <SubmitOrder
      size="small"
      fill={true}
      plain={true}
      {...props}
    />
  );
};

const HoverableContainer: React.FC<JSXBoxProps> = styled(
  Box,
)`
&:hover {
  box-shadow: ${
    (
      props,
    ) =>
    {
      const color = normalizeColor(
        props.theme.global.colors.brand,
        props.theme,
      );

      return `0px 0px 0px 1px ${color}`;
    }
  };

  path {
    stroke-width: 3px;
  }
}
`;

export const StyledContainer: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <HoverableContainer
      align="center"
      justify="center"
      background="brand"
      round="2px"
      fill={true}
      {...props}
    />
  );
};

export const StyledClosedIcon: React.FC<JSXIconProps> = (
  props,
) =>
{
  return (
    <CatalogOption
      size="12px"
      {...props}
    />
  );
};

export const StyledOpenedIcon: React.FC<JSXIconProps> = (
  props,
) =>
{
  return (
    <Catalog
      size="12px"
      {...props}
    />
  );
};
