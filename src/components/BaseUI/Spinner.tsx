import React from "react";
import {
  Block, BlockProps,
} from "baseui/dist/block";
import {
  SpinnerProps,
  StyledSpinnerNext,
} from "baseui/dist/spinner";

type Props = SpinnerProps & {
  container?: React.FC<BlockProps>;
};

const Spinner: React.FC<Props> = ({
  container: Container = Block,
  ...props
}) =>
{
  return (
    <Container>
      <StyledSpinnerNext {...props} />
    </Container>
  );
};

export default Spinner;
