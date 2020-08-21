import React from "react";
import {
  Box,
  BoxProps,
  Grid,
} from "grommet";
import {
  Checkmark,
} from "grommet-icons";

import TradeAction, {
  TradeActionProps,
} from "./TradeAction";

export const StyledContainer: React.FC<BoxProps> = (
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

export const StyledGrid: React.FC<GridProps> = (
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

export const StyledBuyAction: React.FC<PartialBy<TradeActionProps, "actionModifier">> = (
  props,
) =>
{
  return (
    <StyledTradeAction
      {...props}
      actionModifier={1}
      gridArea="buy"
    >
      Buy
    </StyledTradeAction>
  );
};

export const StyledSellAction: React.FC<PartialBy<TradeActionProps, "actionModifier">> = (
  props,
) =>
{
  return (
    <StyledTradeAction
      {...props}
      actionModifier={-1}
      gridArea="sell"
    >
      Sell
    </StyledTradeAction>
  );
};
