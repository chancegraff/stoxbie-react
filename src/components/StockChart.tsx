import React, { useMemo } from "react";
import { HistoricalPrice } from "iex";
import { useStyletron } from "baseui/dist";
import { Theme } from "baseui/dist/theme";
import { Spinner } from "baseui/dist/spinner";
import { Block } from "baseui/dist/block";
import LineChart, { Label } from "components/VX/LineChart";

type Props = {
  prices?: HistoricalPrice[];
  resolution?: Resolution;
  padding?: Padding;
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

const StockChart: React.FC<Props> = ({
  prices,
  resolution = [800, 500],
  padding = [60, 60],
}) => {
  const [, theme] = useStyletron();
  const label: Label = useMemo(
    () => [getLabelProps(theme), getTickLabelProps(theme)],
    [theme]
  );
  if (!prices || !prices.length) {
    const [width, height] = resolution;
    return (
      <Block
        width={`${width}px`}
        height={`${height}px`}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner />
      </Block>
    );
  }
  return (
    <LineChart
      prices={prices}
      resolution={resolution}
      label={label}
      padding={padding}
    />
  );
};

export default StockChart;
