import React from 'react';
import LineChart from '../components/LineChart';
import HistoryTable from '../components/HistoryTable';
import SharePurchase from '../templates/SharePurchase';
import styles from './TradeShares.module.scss';

type Props = unknown;

const TradeShares: React.FC<Props> = () => {
  return (
    <>
      <LineChart className={styles.LineChart} />
      <SharePurchase className={styles.SharePurchase} />
      <HistoryTable className={styles.HistoryTable} />
    </>
  );
};

export default TradeShares;
