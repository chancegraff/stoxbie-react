import React, { useCallback } from "react";
import { format } from "date-fns";
import { AxisBottom as DefaultAxisBottom } from "@vx/axis";
import { TextProps } from "@vx/text/lib/Text";
import { useStyletron } from "baseui/dist";
import { ScaleX } from "components/VX/Shared/Scale";

type Props = {
  yMax: number;
  xScale: ScaleX;
  labelProps: Partial<TextProps>;
  tickLabelProps: () => Partial<TextProps>;
};

const AxisBottom: React.FC<Props> = ({
  xScale,
  yMax,
  labelProps,
  tickLabelProps,
}) => {
  const [, theme] = useStyletron();
  const tickFormat = useCallback(
    (tick: Date) =>
      tick.getMonth() % 12 === 0
        ? format(tick, "MMM ''yy")
        : format(tick, "MMM"),
    []
  );

  return (
    <DefaultAxisBottom<Date>
      top={yMax}
      scale={xScale}
      labelProps={labelProps}
      tickLabelProps={tickLabelProps}
      tickFormat={tickFormat}
      stroke={theme.colors.primaryA}
      tickStroke={theme.colors.primaryA}
      numTicks={12}
      labelOffset={25}
      label="Date"
    />
  );
};

export default AxisBottom;
