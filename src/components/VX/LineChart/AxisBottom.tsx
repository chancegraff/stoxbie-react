import { AxisBottom as DefaultAxisBottom } from "@vx/axis";
import { TextProps } from "@vx/text/lib/Text";
import { useStyletron } from "baseui/dist";
import { ScaleX } from "components/VX/Shared/Scale";
import TimeLabel from "components/VX/Shared/TimeLabel";
import { format } from "date-fns";
import React, { useCallback } from "react";

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
) => {
  const [
    , theme,
  ] = useStyletron();
  const tickFormat = useCallback(
    (
      tick: Date,
    ) => {
      return tick.getMonth() % 12 === 0
        ? format(
          tick,
          "MMM ''yy",
        )
        : format(
          tick,
          "MMM",
        );
    },
    [],
  );

  return (
    <DefaultAxisBottom<Date>
      top={yMax}
      scale={xScale}
      labelProps={labelProps}
      tickLabelProps={tickLabelProps}
      tickFormat={tickFormat}
      stroke={theme.colors.mono400}
      tickStroke={theme.colors.mono400}
      tickComponent={TimeLabel}
      tickLength={5}
      numTicks={12}
      labelOffset={25}
      label="Date"
    />
  );
};

export default AxisBottom;
