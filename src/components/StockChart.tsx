import React, { useMemo, useCallback } from "react";
import { scaleTime, scaleLinear } from "@vx/scale";
import { ScaleTime, ScaleLinear } from "d3-scale";
import { extent, max } from "d3-array";
import { useStyletron } from "baseui/dist";
import { Theme } from "baseui/dist/theme";
import { HistoricalPrice } from "iex";
import { Spinner } from "baseui/dist/spinner";
import LineChart from "components/VX/LineChart";
import useResizeObserver from "use-resize-observer";

type Props = {
  width: number;
  height: number;
  prices: HistoricalPrice[];
};

const xSelector = (price: HistoricalPrice) => new Date(price.date).valueOf();
const ySelector = (price: HistoricalPrice) => price.close;

const getLabelProps = (theme: Theme) => ({
  fill: theme.colors.primaryA,
  strokeWidth: 0,
  ...theme.typography.LabelSmall,
});

const getTickLabelProps = (theme: Theme) => ({
  fill: theme.colors.primaryA,
  strokeWidth: 0,
  ...theme.typography.LabelXSmall,
});

const SafeStockChart: React.FC<Props> = ({ prices, width, height }) => {
  const [, theme] = useStyletron();
  const xMax = useMemo(() => width - 120, [width]);
  const yMax = useMemo(() => height - 80, [height]);

  const xScale: ScaleTime<number, number> = useMemo(() => {
    const [minDate = 0, maxDate = 0] = extent(prices, xSelector);
    return scaleTime({
      rangeRound: [0, xMax],
      domain: [minDate, maxDate],
    });
  }, [xMax, prices]);
  const yScale: ScaleLinear<number, number> = useMemo(() => {
    const maxPrice = max(prices, ySelector) || 0;
    return scaleLinear<number>({
      rangeRound: [0, yMax],
      domain: [maxPrice, 0],
    });
  }, [yMax, prices]);

  const labelProps = useMemo(() => getLabelProps(theme), [theme]);
  const tickLabelProps = useCallback(() => getTickLabelProps(theme), [theme]);

  return (
    <LineChart
      prices={prices}
      width={width}
      height={height}
      xMax={xMax}
      yMax={yMax}
      xScale={xScale}
      yScale={yScale}
      xSelector={xSelector}
      ySelector={ySelector}
      labelProps={labelProps}
      tickLabelProps={tickLabelProps}
    />
  );
};

type UnSafeProps = {
  width?: number;
  height?: number;
  prices?: HistoricalPrice[];
};

const StockChart: React.FC<UnSafeProps> = ({
  width = 800,
  height = 500,
  prices,
}) => {
  if (!prices || !prices.length) {
    return <Spinner />;
  }

  return <SafeStockChart width={width} height={height} prices={prices} />;
};

export default StockChart;
