import React from "react";
import {
  Box,
  Grid,
  JSXBoxProps,
  JSXGridProps,
} from "grommet";
import {
  Checkmark,
} from "grommet-icons";
import {
  PartialBy,
} from "util-types";

import HoldingAction, {
  ActionProps,
} from "./HoldingAction";

export const StyledContainer: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <Box
      wrap={true}
      align="center"
      justify="center"
      margin={
        {
          vertical: "24px",
          horizontal: "0",
        }
      }
      {...props}
    />
  );
};

export const StyledGrid: React.FC<JSXGridProps> = (
  props,
) =>
{
  return (
    <Grid
      responsive={true}
      fill="horizontal"
      gap="small"
      rows={
        [
          "auto",
        ]
      }
      columns={
        [
          "auto",
          "auto",
        ]
      }
      areas={
        [
          [
            "buy",
            "sell",
          ],
        ]
      }
      {...props}
    />
  );
};

const StyledHoldingAction: React.FC<ActionProps> = (
  {
    gridArea,
    ...props
  },
) =>
{
  return (
    <Box gridArea={gridArea}>
      <HoldingAction
        Icon={Checkmark}
        primary={true}
        size="medium"
        {...props}
      />
    </Box>
  );
};

export const StyledBuyAction: React.FC<PartialBy<ActionProps, "shareModifier">> = (
  props,
) =>
{
  return (
    <StyledHoldingAction
      {...props}
      shareModifier={1}
      gridArea="buy"
    >
      Buy
    </StyledHoldingAction>
  );
};

export const StyledSellAction: React.FC<PartialBy<ActionProps, "shareModifier">> = (
  props,
) =>
{
  return (
    <StyledHoldingAction
      {...props}
      shareModifier={-1}
      gridArea="sell"
    >
      Sell
    </StyledHoldingAction>
  );
};
