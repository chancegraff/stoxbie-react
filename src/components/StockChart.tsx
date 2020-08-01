import { useStyletron } from "baseui/dist";
import { Spinner } from "baseui/dist/spinner";
import { Theme } from "baseui/dist/theme";
import LineChart, { Label } from "components/VX/LineChart";
import { HistoricalPrice } from "iex";
import React, { useMemo } from "react";

type Props = {
  resolution: Resolution;
  prices?: HistoricalPrice[];
  padding?: Padding;
};

const getLabelProps = {
  display: "none",
};
const getTickLabelProps = (theme: Theme) => () => ({
  fill: theme.colors.mono300,
  strokeWidth: 0,
  ...theme.typography.LabelXSmall,
});

const StockChart: React.FC<Props> = ({
  prices, resolution, padding = [
    20,
    20,
  ],
}) => {
  const [, theme] = useStyletron();
  const label: Label = useMemo(() => [
    getLabelProps,
    getTickLabelProps(theme),
  ],
  [theme]);
  const responsivePadding: Padding = useMemo(() => (resolution[0] <= theme.breakpoints.medium
    ? [
      10,
      10,
    ]
    : padding),
  [
    resolution,
    theme,
    padding,
  ]);

  if (!prices || !prices.length) {
    return <Spinner />;
  }

  return <LineChart prices={prices} resolution={resolution} label={label} padding={responsivePadding} />;
};

export default StockChart;
