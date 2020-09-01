import React, {
  PropsHasClass,
} from "react";
import {
  JSXBoxProps,
} from "grommet";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  GrommetBox,
  GrommetContainer,
} from "./Skeleton.styled";

export type JSXSkeletonProps = PropsHasClass & JSXBoxProps & {
  Container?: React.FC<JSXBoxProps> | "off";
};

const Skeleton: React.FC<JSXSkeletonProps> = (
  {
    className,
    Container = GrommetContainer,
    ...props
  },
) =>
{
  if (Container === "off")
  {
    return (
      <GrommetBox
        className={className}
        css=""
        {...props}
      />
    );
  }

  return (
    <Container className={className}>
      <GrommetBox
        css=""
        {...props}
      />
    </Container>
  );
};

export default Skeleton;
