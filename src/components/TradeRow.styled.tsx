import React from "react";
import {
  styled,
  withStyle,
} from "baseui/dist";
import {
  Button, SIZE,
} from "baseui/dist/button";
import {
  StyledCell,
} from "baseui/dist/table";

export const SmallButton = styled(
  (
    props,
  ) =>
  {
    return (
      <Button
        {...props}
        size={SIZE.mini}
      />
    );
  },
  (
    {
      $theme,
    },
  ) =>
  {
    return {
      ...$theme.typography.font100,
      height: "20px",
      width: "100%",
    };
  },
);

export const RightAlignedCell = withStyle(
  StyledCell,
  {
    display: "flex",
    justifyContent: "flex-end",
  },
);
