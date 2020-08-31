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
      align="baseline"
      pad="4px 8px"
      {...props}
    />
  );
};

export const GrommetTopText: React.FC<JSXTextProps> = (
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

export const GrommetBottomText: React.FC<JSXTextProps> = (
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
