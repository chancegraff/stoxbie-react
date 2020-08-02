import { scaleLinear, scaleTime } from "@vx/scale";
import { extent, max } from "d3-array";
import { ScaleLinear, ScaleTime } from "d3-scale";
import { HistoricalPrice } from "iex";
import React, { useMemo } from "react";

import { Max, MaxX, MaxY } from "./Max";
import { Select, SelectX, SelectY } from "./Select";

export type ScaleX = ScaleTime<number, number>;
export type ScaleY = ScaleLinear<number, number>;
export type Scale = [ScaleX, ScaleY];

type InjectedProps = {
  scale: Scale;
};

type ScaleProps = {
  prices: HistoricalPrice[];
  select: Select;
  max: Max;
};

type Props = InjectedProps & ScaleProps;

const xScaleCreator = (
  prices: HistoricalPrice[],
  xSelector: SelectX,
  xMax: MaxX,
) => {
  const [
    minDate = 0,
    maxDate = 0,
  ] = extent(
    prices,
    xSelector,
  );

  return scaleTime<number>(
    {
      domain: [
        minDate,
        maxDate,
      ],
      rangeRound: [
        0,
        xMax,
      ],
    },
  );
};

const yScaleCreator = (
  prices: HistoricalPrice[],
  ySelector: SelectY,
  yMax: MaxY,
) => {
  const maxPrice = max(
    prices,
    ySelector,
  ) ?? 0;

  return scaleLinear<number>(
    {
      domain: [
        maxPrice,
        0,
      ],
      rangeRound: [
        0,
        yMax,
      ],
    },
  );
};

const withScale = <P extends React.PropsWithChildren<Props>>(
  WrappedChart: React.FC<P>,
): React.FC<P> => (
    props,
  ) => {
    const select = useMemo(
      () => {
        if (!props.select) {
          return {
            xSelector: () => 0,
            ySelector: () => 0,
          };
        }
        const [
          xSelector,
          ySelector,
        ] = props.select;

        return {
          xSelector,
          ySelector,
        };
      },
      [props.select],
    );
    const maxs = useMemo(
      () => {
        if (!props.max) {
          return {
            xMax: 0,
            yMax: 0,
          };
        }
        const [
          xMax,
          yMax,
        ] = props.max;

        return {
          xMax,
          yMax,
        };
      },
      [props.max],
    );
    const xScale: ScaleTime<number, number> = useMemo(
      () => xScaleCreator(
        props.prices,
        select.xSelector,
        maxs.xMax,
      ),
      [
        props.prices,
        select,
        maxs,
      ],
    );
    const yScale: ScaleLinear<number, number> = useMemo(
      () => yScaleCreator(
        props.prices,
        select.ySelector,
        maxs.yMax,
      ),
      [
        props.prices,
        select,
        maxs,
      ],
    );

    return <WrappedChart {...(props as P)} scale={[
      xScale,
      yScale,
    ]} />;
  };

export default withScale;
