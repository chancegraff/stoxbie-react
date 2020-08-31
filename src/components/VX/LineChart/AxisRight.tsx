import React, {
  useContext,
} from "react";
import {
  AxisRight as DefaultAxisRight,
} from "@vx/axis";
import {
  TextProps,
} from "@vx/text/lib/Text";
import {
  normalizeColor,
} from "grommet/utils";
import {
  ThemeContext,
} from "styled-components/macro";

import {
  ScaleY,
} from "components/VX/Shared/Scale";

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
) =>
{
  const theme = useContext(
    ThemeContext,
  );

  return (
    <DefaultAxisRight
      hideZero={true}
      label="Dollar"
      labelOffset={25}
      labelProps={labelProps}
      left={xMax}
      scale={yScale}
      stroke={
        normalizeColor(
          theme.global.colors["text-xweak"],
          theme,
        )
      }
      tickLabelProps={tickLabelProps}
      tickLength={5}
      tickStroke={
        normalizeColor(
          theme.global.colors["text-xweak"],
          theme,
        )
      }
    />
  );
};

export default AxisRight;
