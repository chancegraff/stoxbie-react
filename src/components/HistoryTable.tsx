import React from 'react';
import { Table } from "baseui/table";
import { Container } from 'components/Base';
import styles from './HistoryTable.module.scss';

type Props = unknown & PropsWithClass;

const HistoryTable: React.FC<Props> = () => {
  return (
    <Container className={styles.HistoryTable}>
      History Table
    </Container>
  );
};

export default HistoryTable;
