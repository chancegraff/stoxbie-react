import React from "react";
import { Slider } from "baseui/slider";
import styles from "./TradeInput.module.scss";

type Props = unknown & PropsWithClass;

const TradeInput: React.FC<Props> = () => {
  return (
    <div className={styles.TradeInput}>
      <div>Trade Input</div>
      <button>Buy</button>
      <button>Sell</button>
    </div>
  );
};

export default TradeInput;
