import { curveLinear } from "@vx/curve";
import { LinePath as DefaultLinePath } from "@vx/shape";
import { useStyletron } from "baseui/dist";
import { ScaleX, ScaleY } from "components/VX/Shared/Scale";
import { HistoricalPrice } from "iex";
import React from "react";

type Props = {
  prices: HistoricalPrice[];
  xScale: ScaleX;
  yScale: ScaleY;
  xSelector: (price: HistoricalPrice) => number;
  ySelector: (price: HistoricalPrice) => number;
};

const LinePath: React.FC<Props> = ({ prices, xScale, yScale, xSelector, ySelector }) => {
  const [, theme] = useStyletron();

  return (
    <DefaultLinePath
      data={prices}
      curve={curveLinear}
      x={(datum) => xScale(xSelector(datum))}
      y={(datum) => yScale(ySelector(datum))}
      stroke={theme.colors.contentPrimary}
      strokeWidth={1}
      shapeRendering="geometricPrecision"
    />
  );
};

export default LinePath;
