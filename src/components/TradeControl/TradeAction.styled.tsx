import React from "react";
import {
  Button,
} from "grommet";

export const StyledButton: React.FC<ButtonProps> = (
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
