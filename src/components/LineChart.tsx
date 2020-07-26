import React from "react";
import { Bar } from "@vx/shape";
import { Group } from "@vx/group";
import styles from "./LineChart.module.scss";

type Props = unknown & PropsWithClass;

const LineChart: React.FC<Props> = () => {
  return <div className={styles.LineChart}>Line Chart</div>;
};

export default LineChart;
