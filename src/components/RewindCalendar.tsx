import React from 'react';
import { StatefulCalendar } from 'baseui/datepicker';
import { Container } from 'components/Base';
import styles from './RewindCalendar.module.scss';

type Props = unknown & PropsWithClass;

const RewindCalendar: React.FC<Props> = () => {
  return (
    <Container className={styles.RewindCalendar}>
      RewindCalendar
    </Container>
  );
};

export default RewindCalendar;
