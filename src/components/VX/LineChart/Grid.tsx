import { Grid as DefaultGrid } from "@vx/grid";
import { useStyletron } from "baseui/dist";
import { Max } from "components/VX/Shared/Max";
import { Scale } from "components/VX/Shared/Scale";
import React from "react";

type Props = {
  scales: Scale;
  max: Max;
};

const Grid: React.FC<Props> = ({ scales, max }) => {
  const [, theme] = useStyletron();
  const [
    xMax,
    yMax,
  ] = max;
  const [
    xScale,
    yScale,
  ] = scales;

  return (
    <DefaultGrid
      xScale={xScale}
      yScale={yScale}
      width={xMax}
      height={yMax}
      numTicksRows={13}
      numTicksColumns={10}
      stroke={theme.colors.mono500}
    />
  );
};

export default Grid;
