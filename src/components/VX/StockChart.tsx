import React, {
  useCallback,
  useContext,
  useMemo,
} from "react";
import {
  ResponsiveContext,
} from "grommet";
import {
  normalizeColor,
} from "grommet/utils";
import {
  HistoricalPrice,
} from "iex-cloud";
import {
  Padding,
  Resolution,
} from "style-types";
import {
  ThemeContext,
} from "styled-components";

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
  const theme = useContext(
    ThemeContext,
  );
  const breakpoint = useContext(
    ResponsiveContext,
  );

  const label: Label = useCallback(
    () =>
    {
      return {
        fill: normalizeColor(
          theme.global.colors["text-xweak"],
          theme,
        ),
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
