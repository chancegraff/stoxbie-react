import React, {
  useContext,
} from "react";
import {
  Grid as DefaultGrid,
} from "@vx/grid";
import {
  normalizeColor,
} from "grommet/utils";
import {
  ThemeContext,
} from "styled-components/macro";

import {
  Max,
} from "components/VX/Shared/Max";
import {
  Scale,
} from "components/VX/Shared/Scale";

type Props = {
  scales: Scale;
  max: Max;
};

const Grid: React.FC<Props> = (
  {
    scales,
    max,
  },
) =>
{
  const theme = useContext(
    ThemeContext,
  );
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
      stroke={
        normalizeColor(
          theme.global.colors["text-xxweak"],
          theme,
        )
      }
      width={xMax}
      xScale={xScale}
      yScale={yScale}
    />
  );
};

export default Grid;
