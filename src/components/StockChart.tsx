import React, { useMemo } from "react";
import { HistoricalPrice } from "iex";
import { Theme } from "baseui/dist/theme";
import LineChart from "components/VX/LineChart";
import { useStyletron } from "baseui/dist";
import { Label } from "./VX/Shared/Label";

type Props = {
  prices: HistoricalPrice[];
  resolution: Resolution;
};

const getLabelProps = (theme: Theme) => ({
  fill: theme.colors.primaryA,
  strokeWidth: 0,
  ...theme.typography.LabelSmall,
});
const getTickLabelProps = (theme: Theme) => () => ({
  fill: theme.colors.primaryA,
  strokeWidth: 0,
  ...theme.typography.LabelXSmall,
});

const StockChart: React.FC<Props> = (props) => {
  const [, theme] = useStyletron();
  const label: Label = useMemo(
    () => [getLabelProps(theme), getTickLabelProps(theme)],
    [theme]
  );
  return <LineChart {...props} label={label} />;
};

export default StockChart;
