import React from "react";
import {
  Spinner as DefaultSpinner,
  SpinnerProps,
} from "baseui/dist/spinner";
import { BlockProps } from "baseui/dist/block";

type Props = SpinnerProps & {
  container: React.FC<
    BlockProps
  >;
};

const Spinner: React.FC<Props> = ({
  container: Container,
  ...props
}) => (
  <Container>
    <DefaultSpinner
      {...props}
    />
  </Container>
);

export default Spinner;
