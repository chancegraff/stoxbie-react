import React from "react";
import {
  styled,
} from "baseui/dist";
import {
  Button,
} from "baseui/dist/button";
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

export const FullButton = styled(
  Button,
  {
    width: "100%",
  },
);
