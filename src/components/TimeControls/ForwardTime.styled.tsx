import React from "react";
import {
  Box,
  Button,
  JSXBoxProps,
  JSXButtonProps,
  JSXTextProps,
  Text,
} from "grommet";

export const GrommetContainer: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <Box
      align="center"
      justify="center"
      direction="column"
      flex={false}
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
      size="small"
      weight="bold"
      margin={
        {
          bottom: "10px",
        }
      }
      {...props}
    />
  );
};

export const GrommetButton: React.FC<JSXButtonProps> = (
  props,
) =>
{
  return (
    <Button
      primary={true}
      size="large"
      label="Continue"
      fill="horizontal"
      {...props}
    />
  );
};
