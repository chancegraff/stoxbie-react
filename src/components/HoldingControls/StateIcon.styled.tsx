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
