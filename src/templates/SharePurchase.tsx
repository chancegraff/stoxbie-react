import React from "react";
import ShareSlider from "components/ShareSlider";
import styles from "./SharePurchase.module.scss";

type Props = unknown & PropsWithClass;

const SharePurchase: React.FC<Props> = () => {
  return (
    <div className={styles.SharePurchase}>
      <ShareSlider className={styles.ShareSlider} />
      <button>Buy</button>
      <button>Sell</button>
    </div>
  );
};

export default SharePurchase;
