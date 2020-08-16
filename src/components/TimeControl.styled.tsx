import React from "react";
import {
  Button,
} from "baseui/dist/button";
import {
  Box,
  BoxProps,
} from "grommet";
import {
  styled,
} from "styletron-react";

export const Container: React.FC<BoxProps> = (
  props,
) =>
{
  return (
    <Box
      wrap={true}
      align="center"
      justify="center"
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
