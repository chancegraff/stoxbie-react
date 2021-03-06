import React from "react";
import {
  Box,
  JSXBoxProps,
} from "grommet";

export const GrommetContainer: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <Box
      direction="row"
      align="end"
      width="100%"
      {...props}
    />
  );
};
