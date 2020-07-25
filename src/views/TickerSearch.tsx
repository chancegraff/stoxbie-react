import React from "react";
import TickerInput from "../components/TickerInput";
import styles from "./TradeShares.module.scss";

type Props = unknown;

const TradeShares: React.FC<Props> = () => {
  return (
    <>
      <TickerInput className={styles.TickerInput} />
    </>
  );
};

export default TradeShares;
