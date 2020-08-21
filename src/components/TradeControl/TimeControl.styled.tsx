import React from "react";
import {
  Box,
  Button,
  Text,
} from "grommet";

export const StyledContainer: React.FC<BoxProps> = (
  props,
) =>
{
  return (
    <Box
      align="center"
      justify="center"
      direction="column"
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

export const StyledButton: React.FC<ButtonProps> = (
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
