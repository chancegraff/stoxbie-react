import React, {
  PropsHasClass,
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

type Props = PropsHasClass & {
  resolution: Resolution;
  prices: HistoricalPrice[] | undefined;
  padding?: Padding;
};

const StockChart: React.FC<Props> = (
  {
    className,
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

  if (!prices ||
      !prices.length)
  {
    return <Spinner />;
  }

  return (
    <LineChart
      className={className}
      css=""
      label={label}
      padding={responsivePadding}
      prices={prices}
      resolution={resolution}
    />
  );
};

export default StockChart;
