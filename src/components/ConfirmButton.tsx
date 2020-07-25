import React from 'react';
import { Button } from "baseui/button";
import styles from './ConfirmButton.module.scss';

type Props = unknown & PropsWithClass;

const ConfirmButton: React.FC<Props> = () => {
  return (
    <div className={styles.ConfirmButton}>
      Confirm Button
    </div>
  );
};

export default ConfirmButton;
