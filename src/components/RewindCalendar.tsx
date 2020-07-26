import React from "react";
import { StatefulCalendar } from "baseui/datepicker";
import styles from "./RewindCalendar.module.scss";

type Props = unknown & PropsWithClass;

const RewindCalendar: React.FC<Props> = () => {
  return <div className={styles.RewindCalendar}>Rewind Calendar</div>;
};

export default RewindCalendar;
