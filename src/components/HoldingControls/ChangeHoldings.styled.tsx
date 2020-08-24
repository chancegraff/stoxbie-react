import React from "react";
import {
  Button,
  JSXButtonProps,
} from "grommet";

export const StyledButton: React.FC<JSXButtonProps> = (
  props,
) =>
{
  return (
    <Button
      gap="small"
      reverse={true}
      {...props}
    />
  );
};
