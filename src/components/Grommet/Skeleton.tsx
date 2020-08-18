import React from "react";
import {
  Box, BoxProps,
} from "grommet";
import styled from "styled-components";

type Props = PropsWithChildren & BoxProps & {
  on: boolean;
};

const ShimmeringBox = styled(
  Box,
)`
  animation : shimmer 2s infinite;
  background-size: 2000px;
`;

const Skeleton: React.FC<Props> = (
  {
    children,
    on,
    ...props
  },
) =>
{
  return on === false
    ? (
      <>
        {children}
      </>
    )
    : (
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

export default Skeleton;
