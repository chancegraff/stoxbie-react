import React from "react";
import {
  Oval,
} from "svg-loaders-react";

import {
  StyledContainer,
} from "./Spinner.styled";

type Props = JSX.IntrinsicElements["svg"] & {
  Container?: React.FC<BoxProps> | "off";
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
