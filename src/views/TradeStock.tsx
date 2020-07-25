import React from 'react';
import cx from 'classnames';
import { Container } from '../components/Base';
import LineChart from '../components/LineChart';
import HistoryTable from '../components/HistoryTable';
import SharePurchase from '../templates/SharePurchase';
import styles from './TradeStock.module.scss';
import { useStyletron } from 'baseui';

type Props = unknown;

const TradeStock: React.FC<Props> = () => {
  const [css, theme] = useStyletron();
  return (
    <Container className={cx(styles.TradeStock, css({
      background: theme.colors.backgroundPrimary,
      color: theme.colors.contentPrimary,
    }))}>
      <LineChart className={styles.LineChart} />
      <SharePurchase className={styles.SharePurchase} />
      <HistoryTable className={styles.HistoryTable} />
    </Container>
  );
};

export default TradeStock;
