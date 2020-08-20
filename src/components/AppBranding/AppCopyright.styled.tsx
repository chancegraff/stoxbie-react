import React from "react";
import {
  Box,
  Text,
} from "grommet";

export const StyledContainer: React.FC<BoxProps> = (
  props,
) =>
{
  return (
    <Box
      pad={
        {
          vertical: "medium",
        }
      }
      {...props}
    />
  );
};

export const StyledText: React.FC<TextProps> = (
  props,
) =>
{
  return (
    <Text
      size="xsmall"
      {...props}
    />
  );
};
