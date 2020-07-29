import React from "react";
import { Group } from "@vx/group";
import { TextProps } from "@vx/text/lib/Text";
import { HistoricalPrice } from "iex";
import Grid from "./Grid";
import AxisBottom from "./AxisBottom";
import AxisRight from "./AxisRight";
import LinePath from "./LinePath";
import LinePoints from "./LinePoints";
import { ScaleY, ScaleX } from "./Scale";

type VXProps = {
  width: number;
  height: number;
  prices: HistoricalPrice[];
  xMax: number;
  yMax: number;
  xScale: ScaleX;
  yScale: ScaleY;
  xSelector: (price: HistoricalPrice) => number;
  ySelector: (price: HistoricalPrice) => number;
  labelProps: Partial<TextProps>;
  tickLabelProps: () => Partial<TextProps>;
};

const LineChart: React.FC<VXProps> = ({
  prices,
  width,
  height,
  xMax,
  yMax,
  xScale,
  yScale,
  xSelector,
  ySelector,
  labelProps,
  tickLabelProps,
}) => (
  <svg width={width} height={height}>
    <Group top={25} left={65}>
      <Grid
        resolution={[width, height]}
        scales={[xScale, yScale]}
        padding={[120, 80]}
      />
      <AxisBottom
        yMax={yMax}
        xScale={xScale}
        labelProps={labelProps}
        tickLabelProps={tickLabelProps}
      />
      <AxisRight
        xMax={xMax}
        yScale={yScale}
        labelProps={labelProps}
        tickLabelProps={tickLabelProps}
      />
      <LinePoints
        prices={prices}
        xScale={xScale}
        yScale={yScale}
        xSelector={xSelector}
        ySelector={ySelector}
      />
      <LinePath
        prices={prices}
        xScale={xScale}
        yScale={yScale}
        xSelector={xSelector}
        ySelector={ySelector}
      />
    </Group>
  </svg>
);

export default LineChart;
