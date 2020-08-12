import React, {
  useCallback,
  useMemo,
} from "react";
import {
  useStyletron,
} from "baseui/dist";
import {
  HistoricalPrice,
} from "iex";

import Spinner from "components/BaseUI/Spinner";
import LineChart, {
  Label,
} from "components/VX/LineChart";

type Props = {
  resolution: Resolution;
  prices?: HistoricalPrice[];
  padding?: Padding;
};

const StockChart: React.FC<Props> = (
  {
    prices,
    resolution,
    padding = [
      20,
      20,
    ],
  },
) =>
{
  const [
    ,
    theme,
  ] = useStyletron();
  const label: Label = useCallback(
    () =>
    {
      return {
        ...theme.typography.LabelXSmall,
        fill: theme.colors.mono300,
        strokeWidth: 0,
      };
    },
    [
      theme,
    ],
  );
  const responsivePadding: Padding = useMemo(
    () =>
    {
      return resolution[0] <= theme.breakpoints.medium
        ? [
          10,
          10,
        ]
        : padding;
    },
    [
      resolution,
      theme,
      padding,
    ],
  );

  if (!prices || !prices.length)
  {
    return <Spinner />;
  }

  return (
    <LineChart
      label={label}
      padding={responsivePadding}
      prices={prices}
      resolution={resolution}
    />
  );
};

export default StockChart;
