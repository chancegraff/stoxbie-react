import React from "react";
import {
  JSXBoxProps,
} from "grommet";

import {
  StyledBox,
  StyledContainer,
} from "./Skeleton.styled";

export type JSXSkeletonProps = JSXBoxProps & {
  Container?: React.FC<JSXBoxProps> | "off";
};

const Skeleton: React.FC<JSXSkeletonProps> = (
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
