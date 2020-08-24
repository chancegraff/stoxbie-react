import React from "react";
import {
  Box,
  JSXBoxProps,
} from "grommet";
import {
  normalizeColor,
} from "grommet/utils";
import styled from "styled-components";

import TickItem from "components/ShareSlider/TickItem";

export const StyledContainer: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <Box
      flex="grow"
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
color: ${
  (
    props,
  ) =>
  {
    return normalizeColor(
      props.theme.global.colors["text-xweak"],
      props.theme,
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
