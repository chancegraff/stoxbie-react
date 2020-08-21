import React from "react";
import {
  Box,
} from "grommet";
import styled from "styled-components";

const ShimmeringBox = styled(
  Box,
)`
  animation : shimmer 2s infinite;
  background-size: 2000px;
`;

export const StyledBox: React.FC<BoxProps> = (
  props,
) =>
{
  return (
    <ShimmeringBox
      fill={true}
      background={
        {
          dark: "linear-gradient(to right, #181818 0%, #000000 25%, #181818 50%)",
          light: "linear-gradient(to right, #F8F8F8 0%, #FFFFFF 25%, #F8F8F8 50%)",
        }
      }
      {...props}
    />
  );
};

export const StyledContainer: React.FC<BoxProps> = (
  props,
) =>
{
  return (
    <Box
      fill={true}
      {...props}
    />
  );
};
