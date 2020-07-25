import React from 'react';
import { Container } from '../components/Base';
import LineChart from '../components/LineChart';
import HistoryTable from '../components/HistoryTable';
import SharePurchase from '../templates/SharePurchase';
import styles from './TradeStock.module.scss';

type Props = unknown;

const TradeStock: React.FC<Props> = () => {
  return (
    <Container className={styles.TradeStock}>
      <LineChart className={styles.LineChart} />
      <SharePurchase className={styles.SharePurchase} />
      <HistoryTable className={styles.HistoryTable} />
    </Container>

  );
};

export default TradeStock;
