import React from "react";
import {
  Box,
  BoxProps,
} from "grommet";

export const GrommetContainer: React.FC<BoxProps> = (
  props,
) =>
{
  return (
    <Box
      fill="horizontal"
      flex="grow"
      {...props}
    />
  );
};
