import React from "react";
import {
  Box, BoxProps,
} from "grommet";

export const Container: React.FC<BoxProps> = (
  props,
) =>
{
  return (
    <Box
      wrap={true}
      align="center"
      justify="center"
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
