import React from "react";
import {
  Box,
  JSXBoxProps,
  JSXTextProps,
  Text,
} from "grommet";

export const GrommetContainer: React.FC<JSXBoxProps> = (
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

export const GrommetText: React.FC<JSXTextProps> = (
  props,
) =>
{
  return (
    <Text
      size="xsmall"
      color="text-xweak"
      {...props}
    />
  );
};
