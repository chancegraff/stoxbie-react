import React from "react";
import LineChart from "components/LineChart";
import HistoryTable from "components/HistoryTable";
import TradeInput from "components/TradeInput";
import styles from "./TradeShares.module.scss";

type Props = unknown;

const TradeShares: React.FC<Props> = () => {
  return (
    <>
      <LineChart className={styles.LineChart} />
      <TradeInput className={styles.TradeInput} />
      <HistoryTable className={styles.HistoryTable} />
    </>
  );
};

export default TradeShares;
