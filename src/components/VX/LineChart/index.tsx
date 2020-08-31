import React from "react";
import {
  Group,
} from "@vx/group";
import {
  TextProps,
} from "@vx/text/lib/Text";
import {
  normalizeColor,
} from "grommet/utils";
import {
  HistoricalPrice,
} from "@chancey/iex-cloud";
import {
  Padding,
  Resolution,
} from "style-types";
import styled from "styled-components";

import withShared from "components/VX/Shared";
import {
  Max,
} from "components/VX/Shared/Max";
import {
  Scale,
} from "components/VX/Shared/Scale";
import {
  Select,
} from "components/VX/Shared/Select";

import AxisBottom from "./AxisBottom";
import AxisRight from "./AxisRight";
import Grid from "./Grid";
import LinePath from "./LinePath";

export type AxisLabelProps = Partial<TextProps>;
export type TickLabelProps = () => Partial<TextProps>;
export type Label = TickLabelProps;

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
)`
fill: ${
  (
    props,
  ) =>
  {
    return normalizeColor(
      props.theme.global.colors["background-contrast"],
      props.theme,
    );
  }
};
`;

const displayNone = {
  display: "none",
};

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
    label,
  },
) =>
{
  return (
    <svg
      height={height}
      width={width}
      role="linechart"
    >
      <Rect
        height={height}
        width={width}
      />
      <Group
        left={horizontalPadding}
        top={verticalPadding}
      >
        <Grid
          max={
            [
              xMax,
              yMax,
            ]
          }
          scales={
            [
              xScale,
              yScale,
            ]
          }
        />
        <AxisBottom
          labelProps={displayNone}
          tickLabelProps={label}
          xScale={xScale}
          yMax={yMax}
        />
        <AxisRight
          labelProps={displayNone}
          tickLabelProps={label}
          xMax={xMax}
          yScale={yScale}
        />
        <LinePath
          prices={prices}
          xScale={xScale}
          xSelector={xSelector}
          yScale={yScale}
          ySelector={ySelector}
        />
      </Group>
    </svg>
  );
};

export default withShared(
  LineChart,
);
