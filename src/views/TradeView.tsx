import React from 'react';
import { Container } from '../components/Base';
import LineChart from '../components/LineChart';
import HistoryTable from '../components/HistoryTable';
import SharePurchase from '../templates/SharePurchase';
import styles from './TradeView.module.scss';

type Props = unknown;

const TradeView: React.FC<Props> = () => {
  return (
    <Container className={styles.TradeView}>
      <LineChart className={styles.LineChart} />
      <SharePurchase className={styles.SharePurchase} />
      <HistoryTable className={styles.HistoryTable} />
    </Container>

  );
};

export default TradeView;
