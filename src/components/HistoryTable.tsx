import React from "react";
import { Table } from "baseui/table";
import styles from "./HistoryTable.module.scss";

type Props = unknown & PropsWithClass;

const HistoryTable: React.FC<Props> = () => {
  return <div className={styles.HistoryTable}>History Table</div>;
};

export default HistoryTable;
