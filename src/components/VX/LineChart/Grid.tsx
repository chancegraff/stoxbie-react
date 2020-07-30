import React from "react";
import { Grid as DefaultGrid } from "@vx/grid";
import { useStyletron } from "baseui/dist";
import { Scale } from "components/VX/Shared/Scale";

type Props = {
  resolution: Resolution;
  scales: Scale;
  padding: [HorizontalPadding, VerticalPadding];
};

const Grid: React.FC<Props> = ({ resolution, scales, padding }) => {
  const [, theme] = useStyletron();
  const [width, height] = resolution;
  const [xScale, yScale] = scales;
  const [horizontalPadding, verticalPadding] = padding;
  return (
    <DefaultGrid
      xScale={xScale}
      yScale={yScale}
      width={width - horizontalPadding}
      height={height - verticalPadding}
      numTicksRows={13}
      numTicksColumns={10}
      stroke={theme.colors.borderOpaque}
    />
  );
};

export default Grid;
