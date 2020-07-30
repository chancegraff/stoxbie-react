import React from "react";
import { HistoricalPrice } from "iex";
import { Theme } from "baseui/dist/theme";
import LineChart from "components/VX/LineChart";

type Props = {
  prices: HistoricalPrice[];
  resolution: Resolution;
  theme: Theme;
};

const StockChart: React.FC<Props> = (props) => <LineChart {...props} />;

export default StockChart;
