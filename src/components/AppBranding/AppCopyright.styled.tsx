import React from "react";
import {
  Box,
  JSXBoxProps,
  JSXTextProps,
  Text,
} from "grommet";

export const StyledContainer: React.FC<JSXBoxProps> = (
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

export const StyledText: React.FC<JSXTextProps> = (
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
