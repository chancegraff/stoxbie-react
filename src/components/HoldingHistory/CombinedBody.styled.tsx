import React from "react";
import {
  Box,
  JSXBoxProps,
} from "grommet";

export const StyledContainer: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <Box
      {...props}
    />
  );
};
