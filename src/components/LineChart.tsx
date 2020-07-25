import React from 'react';
import { Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { Container } from './Base';
import styles from './LineChart.module.scss';

type Props = unknown & PropsWithClass;

const LineChart: React.FC<Props> = () => {
  return (
    <Container className={styles.LineChart}>
      Line Chart
    </Container>
  );
};

export default LineChart;
