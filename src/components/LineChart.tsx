import React from "react";
import { Bar } from "@vx/shape";
import { Group } from "@vx/group";
import { HistoricalPrice } from "iex-cloud";

type Props = {
  prices?: Partial<HistoricalPrice>[];
};

const LineChart: React.FC<Props> = () => {
  return <div>Line Chart</div>;
};

export default LineChart;
