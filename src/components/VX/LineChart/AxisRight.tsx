import React from "react";
import { TextProps } from "@vx/text/lib/Text";
import { AxisRight as DefaultAxisRight } from "@vx/axis";
import { useStyletron } from "baseui/dist";
import { ScaleY } from "components/VX/Shared/Scale";

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
}) => {
  const [, theme] = useStyletron();
  return (
    <DefaultAxisRight
      left={xMax}
      scale={yScale}
      labelProps={labelProps}
      tickLabelProps={tickLabelProps}
      label="Dollar"
      labelOffset={25}
      stroke={theme.colors.primaryA}
      tickStroke={theme.colors.primaryA}
      hideZero={true}
    />
  );
};

export default AxisRight;
