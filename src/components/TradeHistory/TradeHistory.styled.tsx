import React from "react";
import {
  withStyle,
} from "baseui/dist";
import {
  StyledCell as DefaultStyledCell,
  StyledHeadCell as DefaultStyledHeadCell,
  StyledRow,
  StyledTable as DefaultStyledTable,
} from "baseui/dist/table";
import {
  Box,
  BoxProps,
} from "grommet";

export const StyledContainer: React.FC<BoxProps> = (
  props,
) =>
{
  return (
    <Box
      width="100%"
      align="start"
      justify="center"
      flex="grow"
      {...props}
    />
  );
};

export const StyledTable = withStyle(
  DefaultStyledTable,
  () =>
  {
    return {
      height: "100%",
      width: "100%",
      flexGrow: 1,
    };
  },
);

export const StyledHeadCell = withStyle(
  DefaultStyledHeadCell,
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

export const StyledCell = withStyle(
  DefaultStyledCell,
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

export const StyledFooterRow = withStyle(
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
