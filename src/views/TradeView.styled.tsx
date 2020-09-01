import React from "react";
import {
  Box,
  Grid,
  JSXBoxProps,
  JSXGridProps,
} from "grommet";

export const GrommetGrid: React.FC<JSXGridProps> = (
  props,
) =>
{
  return (
    <Grid
      responsive={true}
      fill={true}
      gap="medium"
      columns={
        [
          "flex",
          "auto",
        ]
      }
      rows={
        [
          "auto",
        ]
      }
      areas={
        [
          [
            "chart",
            "trades",
          ],
        ]
      }
      {...props}
    />
  );
};

export const GrommetContentContainer: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <Box
      gridArea="chart"
      {...props}
    />
  );
};

export const GrommetSidebarContainer: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <Box
      gridArea="trades"
      {...props}
    />
  );
};
