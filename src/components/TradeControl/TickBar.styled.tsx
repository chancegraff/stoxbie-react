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
      fill={true}
      align="center"
      justify="start"
      direction="row"
      pad={
        {
          left: "14px",
          right: "8px",
        }
      }
      {...props}
    />
  );
};
