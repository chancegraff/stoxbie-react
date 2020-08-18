import React, {
  useMemo,
} from "react";
import {
  TickRendererProps,
} from "@vx/axis/lib/types";
import {
  Text,
} from "@vx/text";

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
  const formattedValueAsDate = useMemo(
    () =>
    {
      if (formattedValue)
      {
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
      }
    },
    [
      formattedValue,
    ],
  );

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
      {/* <MobileTimeLabel {...props} /> */}
    </>
  );
};

export default TimeLabel;
