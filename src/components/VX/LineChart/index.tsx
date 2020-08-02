import { Group } from "@vx/group";
import { TextProps } from "@vx/text/lib/Text";
import { styled } from "baseui/dist";
import withShared from "components/VX/Shared";
import { Max } from "components/VX/Shared/Max";
import { Scale } from "components/VX/Shared/Scale";
import { Select } from "components/VX/Shared/Select";
import { HistoricalPrice } from "iex";
import React from "react";

import AxisBottom from "./AxisBottom";
import AxisRight from "./AxisRight";
import Grid from "./Grid";
import LinePath from "./LinePath";
// import LinePoints from "./LinePoints";

export type AxisLabelProps = Partial<TextProps>;
export type TickLabelProps = () => Partial<TextProps>;
export type Label = [AxisLabelProps, TickLabelProps];

type Props = {
  prices: HistoricalPrice[];
  resolution: Resolution;
  padding: Padding;
  select: Select;
  scale: Scale;
  max: Max;
  label: Label;
};

const Rect = styled(
  "rect",
  (
    {
      $theme,
    },
  ) => ({
    fill: $theme.colors.backgroundSecondary,
  }),
);

const LineChart: React.FC<Props> = (
  {
    prices,
    resolution: [
      width,
      height,
    ],
    padding: [
      horizontalPadding,
      verticalPadding,
    ],
    select: [
      xSelector,
      ySelector,
    ],
    scale: [
      xScale,
      yScale,
    ],
    max: [
      xMax,
      yMax,
    ],
    label: [
      axisLabelProps,
      tickLabelProps,
    ],
  },
) => (
  <svg width={width} height={height}>
    <Rect width={width} height={height} />
    <Group left={horizontalPadding} top={verticalPadding}>
      <Grid scales={[
        xScale,
        yScale,
      ]} max={[
        xMax,
        yMax,
      ]} />
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
      {/* <LinePoints
        prices={prices}
        xScale={xScale}
        yScale={yScale}
        xSelector={xSelector}
        ySelector={ySelector}
      /> */}
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

export default withShared(
  LineChart,
);
