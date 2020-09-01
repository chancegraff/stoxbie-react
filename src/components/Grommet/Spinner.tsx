import React from "react";
import {
  JSXBoxProps,
} from "grommet";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars
import {
  Oval,
} from "svg-loaders-react";

import {
  StyledContainer,
} from "./Spinner.styled";

type Props = JSX.IntrinsicElements["svg"] & {
  Container?: React.FC<JSXBoxProps> | "off";
};

const Spinner: React.FC<Props> = (
  {
    Container = StyledContainer,
    ...props
  },
) =>
{
  if (Container === "off")
  {
    return (
      <Oval
        css=""
        {...props}
      />
    );
  }

  return (
    <Container fill={true}>
      <Oval
        css=""
        {...props}
      />
    </Container>
  );
};

export default Spinner;
