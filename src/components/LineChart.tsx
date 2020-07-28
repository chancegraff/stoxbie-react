import React, { useMemo, useCallback } from "react";
import moment from "moment";
import { Group } from "@vx/group";
import { scaleTime, scaleLinear } from "@vx/scale";
import { AxisRight, AxisBottom } from "@vx/axis";
import { LinePath } from "@vx/shape";
import { curveNatural } from "@vx/curve";
import { extent, max } from "d3-array";
import { ScaleTime, ScaleLinear } from "d3-scale";
import { HistoricalPrice } from "iex-cloud";
import { Spinner } from "baseui/dist/spinner";
import { useStyletron } from "baseui/dist";
import { Theme } from "baseui/dist/theme";
import useResizeObserver from "use-resize-observer";

const xSelector = (price: HistoricalPrice) => new Date(price.date).valueOf();
const ySelector = (price: HistoricalPrice) => price.close;

type VXProps = {
  width: number;
  height: number;
  prices: HistoricalPrice[];
  xMax: number;
  yMax: number;
};

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

const VXChart: React.FC<VXProps> = ({ prices, width, height, xMax, yMax }) => {
  const [, theme] = useStyletron();

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
    <svg width={width} height={height}>
      <Group top={25} left={65}>
        <AxisBottom
          top={yMax}
          scale={xScale}
          label="Date"
          labelOffset={25}
          labelProps={labelProps}
          stroke={theme.colors.primaryA}
          tickStroke={theme.colors.primaryA}
          tickLabelProps={tickLabelProps}
          tickFormat={(value) => moment(value).format("MMM YY")}
        />
        <AxisRight
          left={xMax}
          scale={yScale}
          label="Dollar"
          labelOffset={25}
          labelProps={labelProps}
          stroke={theme.colors.primaryA}
          tickStroke={theme.colors.primaryA}
          tickLabelProps={tickLabelProps}
        />
        {prices.map(
          (price, priceIndex) =>
            priceIndex % 30 === 0 && (
              <circle
                key={priceIndex}
                r={2.5}
                cx={xScale(xSelector(price))}
                cy={yScale(ySelector(price))}
                stroke={theme.colors.primaryA}
                fill={theme.colors.primaryA}
                fillOpacity={0.5}
              />
            )
        )}
        <LinePath
          data={prices}
          curve={curveNatural}
          x={(d) => xScale(xSelector(d))}
          y={(d) => yScale(ySelector(d))}
          stroke={theme.colors.primaryA}
          strokeWidth={1}
        />
      </Group>
    </svg>
  );
};

type Props = {
  width?: number;
  height?: number;
  prices?: HistoricalPrice[];
};

const LineChart: React.FC<Props> = ({ prices, width = 800, height = 500 }) => {
  const xMax = useMemo(() => width - 120, [width]);
  const yMax = useMemo(() => height - 80, [height]);

  if (!prices || !prices.length) {
    return <Spinner />;
  }

  return (
    <VXChart
      prices={prices}
      width={width}
      height={height}
      xMax={xMax}
      yMax={yMax}
    />
  );
};

export default LineChart;
