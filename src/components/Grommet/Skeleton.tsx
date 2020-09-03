import React from "react";
import {
  JSXBoxProps,
} from "grommet";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  GrommetBox,
  GrommetContainer,
} from "./Skeleton.styled";

export type JSXSkeletonProps = JSXBoxProps & {
  Container?: React.FC<JSXBoxProps> | "off";
};

// TODO Don't pass components
const Skeleton: React.FC<JSXSkeletonProps> = (
  {
    Container = GrommetContainer,
    ...props
  },
) =>
{
  if (Container === "off")
  {
    return (
      <GrommetBox
        css=""
        {...props}
      />
    );
  }

  return (
    <Container>
      <GrommetBox
        css=""
        {...props}
      />
    </Container>
  );
};

export default Skeleton;
