import React from "react";
import {
  SpinnerProps,
  StyledSpinnerNext,
} from "baseui/dist/spinner";
import {
  Box,
  BoxProps,
} from "grommet";

type Props = SpinnerProps & {
  container?: React.FC<BoxProps>;
};

const Spinner: React.FC<Props> = (
  {
    container: Container = Box,
    ...props
  },
) =>
{
  return (
    <Container>
      <StyledSpinnerNext {...props} />
    </Container>
  );
};

export default Spinner;
