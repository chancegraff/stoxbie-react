import React from 'react';
import cx from 'classnames';
import { useStyletron } from 'baseui';
import { Container } from '../components/Base';
import LineChart from '../components/LineChart';
import HistoryTable from '../components/HistoryTable';
import SharePurchase from '../templates/SharePurchase';
import styles from './TradeShares.module.scss';

type Props = unknown;

const TradeShares: React.FC<Props> = () => {
  const [css, theme] = useStyletron();
  return (
    <Container className={cx(styles.TradeShares, css({
      background: theme.colors.backgroundPrimary,
      color: theme.colors.contentPrimary,
    }))}>
      <LineChart className={styles.LineChart} />
      <SharePurchase className={styles.SharePurchase} />
      <HistoryTable className={styles.HistoryTable} />
    </Container>
  );
};

export default TradeShares;
