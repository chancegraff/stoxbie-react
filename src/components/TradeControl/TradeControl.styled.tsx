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

import TradeAction, {
  TradeActionProps,
} from "./TradeAction";

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

const StyledTradeAction: React.FC<TradeActionProps> = (
  {
    gridArea,
    ...props
  },
) =>
{
  return (
    <Box gridArea={gridArea}>
      <TradeAction
        Icon={Checkmark}
        primary={true}
        size="medium"
        {...props}
      />
    </Box>
  );
};

export const StyledBuyAction: React.FC<PartialBy<TradeActionProps, "shareModifier">> = (
  props,
) =>
{
  return (
    <StyledTradeAction
      {...props}
      shareModifier={1}
      gridArea="buy"
    >
      Buy
    </StyledTradeAction>
  );
};

export const StyledSellAction: React.FC<PartialBy<TradeActionProps, "shareModifier">> = (
  props,
) =>
{
  return (
    <StyledTradeAction
      {...props}
      shareModifier={-1}
      gridArea="sell"
    >
      Sell
    </StyledTradeAction>
  );
};
