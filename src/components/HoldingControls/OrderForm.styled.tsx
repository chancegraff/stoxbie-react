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

export const GrommetContainer: React.FC<JSXBoxProps> = (
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

export const GrommetGrid: React.FC<JSXGridProps> = (
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

const StoxbieSubmitOrder: React.FC<SubmitOrderProps> = (
  {
    gridArea,
    ...props
  },
) =>
{
  return (
    <Box
      gridArea={gridArea}
    >
      <SubmitOrder
        Icon={Checkmark}
        primary={true}
        size="medium"
        {...props}
      />
    </Box>
  );
};

export const StoxbieBuyAction: React.FC<Omit<SubmitOrderProps, "submitDirection">> = (
  props,
) =>
{
  return (
    <StoxbieSubmitOrder
      {...props}
      submitDirection={1}
      gridArea="buy"
    >
      Buy
    </StoxbieSubmitOrder>
  );
};

export const StoxbieSellAction: React.FC<Omit<SubmitOrderProps, "submitDirection">> = (
  props,
) =>
{
  return (
    <StoxbieSubmitOrder
      {...props}
      submitDirection={-1}
      gridArea="sell"
    >
      Sell
    </StoxbieSubmitOrder>
  );
};
