import React, {
  useContext,
  useMemo,
} from "react";
import {
  TickRendererProps,
} from "@vx/axis/lib/types";
import {
  Text,
} from "@vx/text";
import {
  ResponsiveContext,
} from "grommet";

import {
  DateFormats,
  formatParsedDate,
} from "utils/Utilities";

type Props = TickRendererProps;

const DesktopTimeLabel: React.FC<Props> = (
  {
    formattedValue,
    ...props
  },
) =>
{
  const breakpoint = useContext(
    ResponsiveContext,
  );

  if (breakpoint !== "large")
  {
    return null;
  }

  return (
    <Text {...props}>
      {formattedValue}
    </Text>
  );
};

const MobileTimeLabel: React.FC<Props> = (
  {
    formattedValue,
    ...props
  },
) =>
{
  const breakpoint = useContext(
    ResponsiveContext,
  );
  const formattedValueAsDate = useMemo(
    () =>
    {
      if (!formattedValue)
      {
        return;
      }

      const yearPattern = new RegExp(
        /^[\w]+ '[\d]+$/,
      );
      const yearMatch = yearPattern.test(
        formattedValue.toString(),
      );

      if (yearMatch)
      {
        return formatParsedDate(
          formattedValue.toString(),
          DateFormats.TickLarge,
          DateFormats.TickYear,
        );
      }
    },
    [
      formattedValue,
    ],
  );

  if (breakpoint === "large")
  {
    return null;
  }

  return (
    <Text {...props}>
      {formattedValueAsDate}
    </Text>
  );
};

const TimeLabel: React.FC<Props> = (
  props,
) =>
{
  return (
    <>
      <DesktopTimeLabel {...props} />
      <MobileTimeLabel {...props} />
    </>
  );
};

export default TimeLabel;
