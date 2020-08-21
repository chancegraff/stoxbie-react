import React from "react";

import {
  StyledBox,
  StyledContainer,
} from "./Skeleton.styled";

export type SkeletonProps = BoxProps & {
  Container?: React.FC<BoxProps> | "off";
};

const Skeleton: React.FC<SkeletonProps> = (
  {
    Container = StyledContainer,
    ...props
  },
) =>
{
  if (Container === "off")
  {
    return <StyledBox {...props} />;
  }

  return (
    <Container>
      <StyledBox {...props} />
    </Container>
  );
};

export default Skeleton;
