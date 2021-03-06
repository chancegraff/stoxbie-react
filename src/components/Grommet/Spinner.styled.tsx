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
      align="center"
      justify="center"
      fill={true}
      {...props}
    />
  );
};
