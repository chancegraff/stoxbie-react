import React from "react";
import { Group } from "@vx/group";
import { TextProps } from "@vx/text/lib/Text";
import { HistoricalPrice } from "iex";
import { Select } from "components/VX/Shared/Select";
import { Scale } from "components/VX/Shared/Scale";
import { Max } from "components/VX/Shared/Max";
import withShared from "components/VX/Shared";
import Grid from "./Grid";
import AxisBottom from "./AxisBottom";
import AxisRight from "./AxisRight";
import LinePath from "./LinePath";
import LinePoints from "./LinePoints";

export type AxisLabelProps = Partial<TextProps>;
export type TickLabelProps = () => Partial<TextProps>;
export type Label = [AxisLabelProps, TickLabelProps];

type Props = {
  prices: HistoricalPrice[];
  resolution: Resolution;
  select: Select;
  scale: Scale;
  max: Max;
  label: Label;
};

const LineChart: React.FC<Props> = ({
  prices,
  resolution: [width, height],
  select: [xSelector, ySelector],
  scale: [xScale, yScale],
  max: [xMax, yMax],
  label: [axisLabelProps, tickLabelProps],
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
        labelProps={axisLabelProps}
        tickLabelProps={tickLabelProps}
      />
      <AxisRight
        xMax={xMax}
        yScale={yScale}
        labelProps={axisLabelProps}
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

export default withShared(LineChart);
