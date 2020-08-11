import React, {
  useCallback,
} from "react";
import {
  AxisBottom as DefaultAxisBottom,
} from "@vx/axis";
import {
  TextProps,
} from "@vx/text/lib/Text";
import {
  useStyletron,
} from "baseui/dist";

import {
  DateFormats,
  formatDate,
} from "services/Utilities";
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
  const [
    ,
    theme,
  ] = useStyletron();
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
      stroke={theme.colors.mono400}
      tickComponent={TimeLabel}
      tickFormat={tickFormat}
      tickLabelProps={tickLabelProps}
      tickLength={5}
      tickStroke={theme.colors.mono400}
      top={yMax}
    />
  );
};

export default AxisBottom;
