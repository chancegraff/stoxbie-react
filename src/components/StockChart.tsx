import React, { useMemo } from "react";
import { HistoricalPrice } from "iex";
import { useStyletron } from "baseui/dist";
import { Theme } from "baseui/dist/theme";
import { Spinner } from "baseui/dist/spinner";
import { Block } from "baseui/dist/block";
import LineChart, { Label } from "components/VX/LineChart";

type Props = {
  resolution: Resolution;
  prices?: HistoricalPrice[];
  padding?: Padding;
};

const getLabelProps = {
  display: "none",
};
const getTickLabelProps = (theme: Theme) => () => ({
  fill: theme.colors.primaryA,
  strokeWidth: 0,
  ...theme.typography.LabelXSmall,
});

const StockChart: React.FC<Props> = ({
  prices,
  resolution,
  padding = [20, 20],
}) => {
  const [, theme] = useStyletron();
  const label: Label = useMemo(
    () => [getLabelProps, getTickLabelProps(theme)],
    [theme]
  );
  const responsivePadding: Padding = useMemo(
    () => (resolution[0] <= 440 ? [10, 7.5] : padding),
    [resolution, padding]
  );
  if (!prices || !prices.length) {
    return <Spinner />;
  }
  return (
    <LineChart
      prices={prices}
      resolution={resolution}
      label={label}
      padding={responsivePadding}
    />
  );
};

export default StockChart;
