import React from "react";
import {
  withStyle,
} from "baseui/dist";
import {
  StyledCell,
  StyledHeadCell,
  StyledRow,
  StyledTable,
} from "baseui/dist/table";
import {
  Box,
  BoxProps,
} from "grommet";

export const Container: React.FC<BoxProps> = (
  props,
) =>
{
  return (
    <Box
      height="0"
      width="100%"
      align="center"
      justify="center"
      {...props}
    />
  );
};

export const FullTable = withStyle(
  StyledTable,
  () =>
  {
    return {
      height: "100%",
      width: "100%",
      flexGrow: 1,
    };
  },
);

export const HeadCell = withStyle(
  StyledHeadCell,
  (
    {
      $theme,
    },
  ) =>
  {
    return {
      ...$theme.typography.LabelSmall,
    };
  },
);

export const RightAlignedCell = withStyle(
  StyledCell,
  (
    {
      $theme,
    },
  ) =>
  {
    return {
      display: "flex",
      justifyContent: "flex-end",
      height: "100%",
      borderRight: `1px solid ${$theme.colors.borderOpaque}`,
      ":last-of-type": {
        borderRight: 0,
      },
    };
  },
);

export const StickyFooter = withStyle(
  StyledRow,
  (
    {
      $theme,
    },
  ) =>
  {
    return {
      backgroundColor: $theme.colors.backgroundAlt,
      width: "100%",
    };
  },
);
