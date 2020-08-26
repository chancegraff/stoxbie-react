import React, {
  useCallback,
  useContext,
} from "react";
import {
  AxisBottom as DefaultAxisBottom,
} from "@vx/axis";
import {
  TextProps,
} from "@vx/text/lib/Text";
import {
  normalizeColor,
} from "grommet/utils";
import {
  ThemeContext,
} from "styled-components";

import {
  DateFormats,
  formatDate,
} from "utils/Utilities";
import {
  ScaleX,
} from "components/VX/Shared/Scale";
import TimeLabel from "components/VX/Shared/TimeLabel";

export const BOTTOM_LABELS_HEIGHT = 15;

type Props = {
  yMax: number;
  xScale: ScaleX;
  labelProps: Partial<TextProps>;
  tickLabelProps: () => Partial<TextProps>;
};

const AxisBottom: React.FC<Props> = (
  {
    xScale,
    yMax,
    labelProps,
    tickLabelProps,
  },
) =>
{
  const theme = useContext(
    ThemeContext,
  );
  const tickFormat = useCallback(
    (
      tick: Date,
    ) =>
    {
      return tick.getMonth() % 12 === 0
        ? formatDate(
          tick,
          DateFormats.TickLarge,
        )
        : formatDate(
          tick,
          DateFormats.TickSmall,
        );
    },
    [],
  );

  return (
    <DefaultAxisBottom<Date>
      label="Date"
      labelOffset={25}
      labelProps={labelProps}
      numTicks={12}
      scale={xScale}
      stroke={
        normalizeColor(
          theme.global.colors["text-strong"],
          theme,
        )
      }
      tickComponent={TimeLabel}
      tickFormat={tickFormat}
      tickLabelProps={tickLabelProps}
      tickLength={5}
      tickStroke={
        normalizeColor(
          theme.global.colors["text-strong"],
          theme,
        )
      }
      top={yMax}
    />
  );
};

export default AxisBottom;
