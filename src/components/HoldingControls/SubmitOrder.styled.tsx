import React from "react";
import {
  Button,
  JSXButtonProps,
} from "grommet";

export const GrommetButton: React.FC<JSXButtonProps> = (
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
