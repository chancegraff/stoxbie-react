import React from "react";
import {
  Box,
  JSXBoxProps,
} from "grommet";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

export const StyledContainer: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <Box
      css=""
      fill={true}
      {...props}
    />
  );
};
