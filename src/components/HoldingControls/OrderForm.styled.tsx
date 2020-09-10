import React from "react";
import {
  Box,
  JSXBoxProps,
} from "grommet";

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
      flex={false}
      height={
        {
          min: "96px",
        }
      }
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

export const StoxbieSubmitOrder: React.FC<SubmitOrderProps> = (
  {
    gridArea,
    ...props
  },
) =>
{
  return (
    <Box
      fill={true}
      gridArea={gridArea}
      margin={
        {
          top: "12px",
        }
      }
    >
      <SubmitOrder
        primary={true}
        size="medium"
        {...props}
      >
        Order
      </SubmitOrder>
    </Box>
  );
};
