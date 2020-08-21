import React from "react";
import {
  Box,
} from "grommet";

export const StyledContainer: React.FC<BoxProps> = (
  props,
) =>
{
  return (
    <Box
      align="center"
      justify="center"
      width="24px"
      height="24px"
      border={
        {
          color: "text",
        }
      }
      round={true}
      {...props}
    />
  );
};
