import React from 'react';
import { StatefulInput } from 'baseui/input';
import styles from './TickerInput.module.scss';
import { Container } from './Base';

const Root: React.FC = (props) => (
  <Container className={styles.TickerInput}>
    {props.children}
  </Container>
);

const overrides = {
  Root,
};

type Props = unknown & PropsWithClass;

const initialState = {
  value: 'I manage my own state...',
};

const TickerInput: React.FC<Props> = () => {
  return (
    <StatefulInput
      initialState={initialState}
      placeholder="I manage my own state..."
      overrides={overrides}
    />
  );
};

export default TickerInput;
