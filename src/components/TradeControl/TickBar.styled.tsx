import React from "react";
import {
  Box,
  JSXBoxProps,
} from "grommet";
import {
  normalizeColor,
} from "grommet/utils";
import styled from "styled-components";

import TickItem from "components/TradeControl/TickItem";

export const StyledContainer: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <Box
      fill={true}
      align="center"
      justify="start"
      direction="row"
      pad={
        {
          left: "14px",
          right: "8px",
        }
      }
      {...props}
    />
  );
};

export const StyledTickItem = styled(
  TickItem,
)`
fill: ${
  (
    props,
  ) =>
  {
    return normalizeColor(
      props.theme.global.colors["text-xweak"],
      props.theme.dark,
    );
  }
};
font-size: ${
  (
    props,
  ) =>
  {
    return String(
      props.theme.text.xsmall.size,
    );
  }
};
font-family: ${
  (
    props,
  ) =>
  {
    return String(
      props.theme.global.font.family,
    );
  }
};
`;
