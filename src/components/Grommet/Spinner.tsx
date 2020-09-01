import React, {
  PropsHasClass,
} from "react";
import {
  JSXBoxProps,
} from "grommet";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars
import {
  Oval,
} from "svg-loaders-react";

import {
  GrommetContainer,
} from "./Spinner.styled";

type Props = PropsHasClass & JSX.IntrinsicElements["svg"] & {
  Container?: React.FC<JSXBoxProps> | "off";
};

const Spinner: React.FC<Props> = (
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
      <Oval
        className={className}
        css=""
        {...props}
      />
    );
  }

  return (
    <Container
      className={className}
      fill={true}
    >
      <Oval
        css=""
        {...props}
      />
    </Container>
  );
};

export default Spinner;
