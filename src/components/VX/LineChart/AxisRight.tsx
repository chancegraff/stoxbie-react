import { AxisRight as DefaultAxisRight } from "@vx/axis";
import { TextProps } from "@vx/text/lib/Text";
import { useStyletron } from "baseui/dist";
import { ScaleY } from "components/VX/Shared/Scale";
import React from "react";

export const RIGHT_LABELS_WIDTH = 25;

type Props = {
  xMax: number;
  yScale: ScaleY;
  labelProps: Partial<TextProps>;
  tickLabelProps: () => Partial<TextProps>;
};

const AxisRight: React.FC<Props> = (
  {
    xMax,
    yScale,
    labelProps,
    tickLabelProps,
  },
) => {
  const [
    , theme,
  ] = useStyletron();

  return (
    <DefaultAxisRight
      left={xMax}
      scale={yScale}
      labelProps={labelProps}
      tickLabelProps={tickLabelProps}
      label="Dollar"
      labelOffset={25}
      stroke={theme.colors.mono400}
      tickStroke={theme.colors.mono400}
      tickLength={5}
      hideZero={true}
    />
  );
};

export default AxisRight;
