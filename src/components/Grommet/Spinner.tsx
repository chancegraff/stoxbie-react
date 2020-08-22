import React from "react";
import {
  JSXBoxProps,
} from "grommet";
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
    return <Oval {...props} />;
  }

  return (
    <Container fill={true}>
      <Oval {...props} />
    </Container>
  );
};

export default Spinner;
