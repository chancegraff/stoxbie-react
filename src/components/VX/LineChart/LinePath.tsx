import React from "react";
import { LinePath as DefaultLinePath } from "@vx/shape";
import { curveLinear } from "@vx/curve";
import { HistoricalPrice } from "iex";
import { useStyletron } from "baseui/dist";
import { ScaleX, ScaleY } from "components/VX/Shared/Scale";

type Props = {
  prices: HistoricalPrice[];
  xScale: ScaleX;
  yScale: ScaleY;
  xSelector: (price: HistoricalPrice) => number;
  ySelector: (price: HistoricalPrice) => number;
};

const LinePath: React.FC<Props> = ({
  prices,
  xScale,
  yScale,
  xSelector,
  ySelector,
}) => {
  const [, theme] = useStyletron();
  return (
    <DefaultLinePath
      data={prices}
      curve={curveLinear}
      x={(d) => xScale(xSelector(d))}
      y={(d) => yScale(ySelector(d))}
      stroke={theme.colors.contentPrimary}
      strokeWidth={1}
      shapeRendering="geometricPrecision"
    />
  );
};

export default LinePath;
