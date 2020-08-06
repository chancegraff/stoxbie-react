import React from "react";
import { Grid as DefaultGrid } from "@vx/grid";
import { useStyletron } from "baseui/dist";

import { Max } from "components/VX/Shared/Max";
import { Scale } from "components/VX/Shared/Scale";

type Props = {
  scales: Scale;
  max: Max;
};

const Grid: React.FC<Props> = ({
  scales,
  max,
}) => {
  const [
    , theme,
  ] = useStyletron();
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
      height={yMax}
      numTicksColumns={10}
      numTicksRows={13}
      stroke={theme.colors.mono500}
      width={xMax}
      xScale={xScale}
      yScale={yScale}
    />
  );
};

export default Grid;
