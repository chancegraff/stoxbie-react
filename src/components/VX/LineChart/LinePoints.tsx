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

const LinePoints: React.FC<Props> = (
  {
    prices,
    xScale,
    yScale,
    xSelector,
    ySelector,
  },
) => {
  const [
    , theme,
  ] = useStyletron();

  return (
    <>
      {prices.map(
        (
          price, priceIndex,
        ) => {
          return (
            priceIndex % 20 === 0 && (
              <circle
                cx={xScale(
                  xSelector(
                    price,
                  ),
                )}
                cy={yScale(
                  ySelector(
                    price,
                  ),
                )}
                fill={theme.colors.contentPrimary}
                fillOpacity={0.5}
                key={priceIndex}
                r={2}
                shapeRendering="geometricPrecision"
                stroke={theme.colors.contentPrimary}
              />
            )
          );
        },
      )}
    </>
  );
};

export default LinePoints;
