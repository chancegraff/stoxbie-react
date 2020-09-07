import React, {
  useCallback,
  useContext,
  useMemo,
} from "react";
import {
  HistoricalPrice,
} from "@chancey/iex-cloud";
import {
  ResponsiveContext,
} from "grommet";
import {
  normalizeColor,
} from "grommet/utils";
import {
  List,
} from "immutable";
import {
  Padding,
  Resolution,
} from "style-types";
import styled, { // eslint-disable-line @typescript-eslint/no-unused-vars
  ThemeContext,
} from "styled-components/macro";

import Spinner from "components/Grommet/Spinner";
import LineChart, {
  Label,
} from "components/VX/LineChart";

type Props = {
  resolution: Resolution;
  prices: List<HistoricalPrice>;
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

  if (prices.isEmpty())
  {
    return <Spinner />;
  }

  return (
    <LineChart
      css=""
      label={label}
      padding={responsivePadding}
      prices={prices.toArray()}
      resolution={resolution}
    />
  );
};

export default StockChart;
