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

import SubmitOrder, {
  SubmitOrderProps,
} from "./SubmitOrder";

export const StyledContainer: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <Box
      direction="column"
      align="center"
      justify="center"
      flex="grow"
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
      margin={
        {
          top: "xsmall",
        }
      }
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

const StyledSubmitOrder: React.FC<SubmitOrderProps> = (
  {
    gridArea,
    ...props
  },
) =>
{
  return (
    <Box gridArea={gridArea}>
      <SubmitOrder
        Icon={Checkmark}
        primary={true}
        size="medium"
        {...props}
      />
    </Box>
  );
};

export const StyledBuyAction: React.FC<Omit<SubmitOrderProps, "submitDirection">> = (
  props,
) =>
{
  return (
    <StyledSubmitOrder
      {...props}
      submitDirection={1}
      gridArea="buy"
    >
      Buy
    </StyledSubmitOrder>
  );
};

export const StyledSellAction: React.FC<Omit<SubmitOrderProps, "submitDirection">> = (
  props,
) =>
{
  return (
    <StyledSubmitOrder
      {...props}
      submitDirection={-1}
      gridArea="sell"
    >
      Sell
    </StyledSubmitOrder>
  );
};
