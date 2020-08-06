import React from "react";
import { AxisRight as DefaultAxisRight } from "@vx/axis";
import { TextProps } from "@vx/text/lib/Text";
import { useStyletron } from "baseui/dist";

import { ScaleY } from "components/VX/Shared/Scale";

export const RIGHT_LABELS_WIDTH = 25;

type Props = {
  xMax: number;
  yScale: ScaleY;
  labelProps: Partial<TextProps>;
  tickLabelProps: () => Partial<TextProps>;
};

const AxisRight: React.FC<Props> = ({
  xMax,
  yScale,
  labelProps,
  tickLabelProps,
}) =>
{
  const [
    , theme,
  ] = useStyletron();

  return (
    <DefaultAxisRight
      hideZero={true}
      label="Dollar"
      labelOffset={25}
      labelProps={labelProps}
      left={xMax}
      scale={yScale}
      stroke={theme.colors.mono400}
      tickLabelProps={tickLabelProps}
      tickLength={5}
      tickStroke={theme.colors.mono400}
    />
  );
};

export default AxisRight;
