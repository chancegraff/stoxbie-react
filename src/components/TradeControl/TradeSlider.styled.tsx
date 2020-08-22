import React from "react";
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
      fill="horizontal"
      {...props}
    />
  );
};
