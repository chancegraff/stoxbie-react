import React, {
  useCallback,
  useContext,
  useMemo,
} from "react";
import {
  ResponsiveContext,
  ThemeContext,
} from "grommet";
import {
  HistoricalPrice,
} from "iex";

import {
  getColors,
  useTheme,
} from "services/Grommet";
import Spinner from "components/Grommet/Spinner";
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
  const theme = useTheme(
    ThemeContext,
  );
  const breakpoint = useContext(
    ResponsiveContext,
  );

  const label: Label = useCallback(
    () =>
    {
      const {
        dark,
        light,
      } = getColors(
        theme.global.colors["text-xweak"],
      );

      return {
        fill: theme.dark
          ? dark
          : light,
        strokeWidth: 0,
        fontSize: theme.text.xsmall.size,
        fontFamily: theme.global.font.family,
      };
    },
    [
      theme,
    ],
  );
  const responsivePadding: Padding = useMemo(
    () =>
    {
      if (breakpoint === "small")
      {
        return [
          10,
          10,
        ];
      }

      return padding;
    },
    [
      breakpoint,
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
