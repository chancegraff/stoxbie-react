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
      align="baseline"
      pad="4px 8px"
      {...props}
    />
  );
};

export const StyledTopText: React.FC<JSXTextProps> = (
  props,
) =>
{
  return (
    <Text
      size="medium"
      color="text-strong"
      {...props}
    />
  );
};

export const StyledBottomText: React.FC<JSXTextProps> = (
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
