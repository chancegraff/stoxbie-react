import React, { useMemo } from "react";
import { scaleTime, scaleLinear } from "@vx/scale";
import { ScaleTime, ScaleLinear } from "d3-scale";
import { extent, max } from "d3-array";
import { HistoricalPrice } from "iex";
import { Select, SelectX, SelectY } from "./Select";
import { Max, MaxX, MaxY } from "./Max";

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
  xMax: MaxX
) => {
  const [minDate = 0, maxDate = 0] = extent(prices, xSelector);
  return scaleTime<number>({
    rangeRound: [0, xMax],
    domain: [minDate, maxDate],
  });
};

const yScaleCreator = (
  prices: HistoricalPrice[],
  ySelector: SelectY,
  yMax: MaxY
) => {
  const maxPrice = max(prices, ySelector) ?? 0;
  return scaleLinear<number>({
    rangeRound: [0, yMax],
    domain: [maxPrice, 0],
  });
};

const withScale = <P extends React.PropsWithChildren<Props>>(
  WrappedChart: React.FC<P>
): React.FC<P> => (props) => {
  const select = useMemo(() => {
    if (!props.select) {
      return {
        xSelector: () => 0,
        ySelector: () => 0,
      };
    }
    const [xSelector, ySelector] = props.select;
    return {
      xSelector,
      ySelector,
    };
  }, [props.select]);
  const max = useMemo(() => {
    if (!props.max) {
      return {
        xMax: 0,
        yMax: 0,
      };
    }
    const [xMax, yMax] = props.max;
    return {
      xMax,
      yMax,
    };
  }, [props.max]);
  const xScale: ScaleTime<number, number> = useMemo(
    () => xScaleCreator(props.prices, select.xSelector, max.xMax),
    [props.prices, select, max]
  );
  const yScale: ScaleLinear<number, number> = useMemo(
    () => yScaleCreator(props.prices, select.ySelector, max.yMax),
    [props.prices, select, max]
  );
  return <WrappedChart {...(props as P)} scale={[xScale, yScale]} />;
};

export default withScale;
