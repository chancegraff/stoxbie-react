import React from 'react';
import { StatefulInput } from 'baseui/input';
import styles from './TickerInput.module.scss';

type Props = unknown;

const initialState = {
  value: 'I manage my own state...',
};

const TickerInput: React.FC<Props> = () => {
  return (
    <StatefulInput
      initialState={initialState}
      placeholder="I manage my own state..."
    />
  );
};

export default TickerInput;
