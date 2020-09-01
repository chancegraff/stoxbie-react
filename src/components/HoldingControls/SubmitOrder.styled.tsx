import React from "react";
import {
  Button,
  JSXButtonProps,
} from "grommet";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

export const StyledButton: React.FC<JSXButtonProps> = (
  props,
) =>
{
  return (
    <Button
      css=""
      gap="small"
      reverse={true}
      {...props}
    />
  );
};
