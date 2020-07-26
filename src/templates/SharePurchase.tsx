import React from "react";
import { Container } from "components/Base";
import ConfirmButton from "components/ConfirmButton";
import ShareSlider from "components/ShareSlider";
import styles from "./SharePurchase.module.scss";

type Props = unknown & PropsWithClass;

const SharePurchase: React.FC<Props> = () => {
  return (
    <Container className={styles.SharePurchase}>
      <ShareSlider className={styles.ShareSlider} />
      <ConfirmButton>Buy</ConfirmButton>
      <ConfirmButton>Sell</ConfirmButton>
    </Container>
  );
};

export default SharePurchase;
