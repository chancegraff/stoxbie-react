import React, {
  useContext,
} from "react";
import {
  curveLinear,
} from "@vx/curve";
import {
  LinePath as DefaultLinePath,
} from "@vx/shape";
import {
  normalizeColor,
} from "grommet/utils";
import {
  HistoricalPrice,
} from "@chancey/iex-cloud";
import {
  ThemeContext,
} from "styled-components";

import {
  ScaleX,
  ScaleY,
} from "components/VX/Shared/Scale";

type Props = {
  prices: HistoricalPrice[];
  xScale: ScaleX;
  yScale: ScaleY;
  xSelector: (price: HistoricalPrice) => number;
  ySelector: (price: HistoricalPrice) => number;
};

const LinePath: React.FC<Props> = (
  {
    prices,
    xScale,
    yScale,
    xSelector,
    ySelector,
  },
) =>
{
  const theme = useContext(
    ThemeContext,
  );

  return (
    <DefaultLinePath
      curve={curveLinear}
      data={prices}
      shapeRendering="geometricPrecision"
      stroke={
        normalizeColor(
          theme.global.colors["text-strong"],
          theme,
        )
      }
      strokeWidth={1}
      x={
        (
          datum,
        ) =>
        {
          return xScale(
            xSelector(
              datum,
            ),
          );
        }
      }
      y={
        (
          datum,
        ) =>
        {
          return yScale(
            ySelector(
              datum,
            ),
          );
        }
      }
    />
  );
};

export default LinePath;
