import { BlockProps } from "baseui/dist/block";
import { Spinner as DefaultSpinner, SpinnerProps } from "baseui/dist/spinner";
import React from "react";

type Props = SpinnerProps & {
  container: React.FC<BlockProps>;
};

const Spinner: React.FC<Props> = ({ container: Container, ...props }) => (
  <Container>
    <DefaultSpinner {...props} />
  </Container>
);

export default Spinner;
