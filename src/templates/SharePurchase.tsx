import React from "react";
import { Container } from "../components/Base";
import ConfirmButton from "../components/ConfirmButton";
import ShareSlider from "../components/ShareSlider";
import styles from "./SharePurchase.module.scss";

type Props = unknown & PropsWithClass;

const SharePurchase: React.FC<Props> = () => {
  return (
    <Container className={styles.SharePurchase}>
      <ShareSlider className={styles.ShareSlider} />
      <ConfirmButton className={styles.ConfirmBuy} />
      <ConfirmButton className={styles.ConfirmSell} />
    </Container>
  );
};

export default SharePurchase;
