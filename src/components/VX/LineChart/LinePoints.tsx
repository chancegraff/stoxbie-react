import React from "react";
import { HistoricalPrice } from "iex";
import { useStyletron } from "baseui/dist";
import {
  ScaleX,
  ScaleY,
} from "components/VX/Shared/Scale";

type Props = {
  prices: HistoricalPrice[];
  xScale: ScaleX;
  yScale: ScaleY;
  xSelector: (
    price: HistoricalPrice
  ) => number;
  ySelector: (
    price: HistoricalPrice
  ) => number;
};

const LinePoints: React.FC<Props> = ({
  prices,
  xScale,
  yScale,
  xSelector,
  ySelector,
}) => {
  const [
    ,
    theme,
  ] = useStyletron();
  return (
    <>
      {prices.map(
        (
          price,
          priceIndex
        ) =>
          priceIndex %
            20 ===
            0 && (
            <circle
              key={
                priceIndex
              }
              r={
                2
              }
              cx={xScale(
                xSelector(
                  price
                )
              )}
              cy={yScale(
                ySelector(
                  price
                )
              )}
              stroke={
                theme
                  .colors
                  .contentPrimary
              }
              fill={
                theme
                  .colors
                  .contentPrimary
              }
              fillOpacity={
                0.5
              }
              shapeRendering="geometricPrecision"
            />
          )
      )}
    </>
  );
};

export default LinePoints;
