import React from "react";
import {
  Box,
  JSXBoxProps,
} from "grommet";
import {
  normalizeColor,
} from "grommet/utils";
import styled from "styled-components/macro";

import TickItem from "components/ShareSlider/TickItem";

export const GrommetContainer: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <Box
      flex="grow"
      align="center"
      justify="between"
      direction="row"
      pad={
        {
          left: "4px",
          right: "4px",
        }
      }
      {...props}
    />
  );
};

export const StoxbieTickItem = styled(
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
