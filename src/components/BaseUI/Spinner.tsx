import React from "react";
import { Block, BlockProps } from "baseui/dist/block";
import { Spinner as DefaultSpinner, SpinnerProps } from "baseui/dist/spinner";

type Props = SpinnerProps & {
  container?: React.FC<BlockProps>;
};

const Spinner: React.FC<Props> = (
  {
    container: Container = Block,
    ...props
  },
) => {
  return (
    <Container>
      <DefaultSpinner {...props} />
    </Container>
  );
};

export default Spinner;
