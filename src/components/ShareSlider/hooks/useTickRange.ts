import {
  useMemo,
} from "react";

import {
  SLIDER_TICK_COUNT,
} from "utils/Constants";

const SliderValues = Array(
  SLIDER_TICK_COUNT,
);

const TickValuesByDirection = (
  direction: number,
) =>
{
  return (
    element: unknown,
    index: number,
  ) =>
  {
    return (
      tickValue: number,
    ) =>
    {
      return tickValue * (SliderValues.length - index) * direction;
    };
  };
};

export const useTickRange = () =>
{
  const tickRange = useMemo(
    () =>
    {
      const maxRange = Array.from(
        SliderValues,
        TickValuesByDirection(
          1,
        ),
      );
      const minRange = Array.from(
        SliderValues,
        TickValuesByDirection(
          -1,
        ),
      );

      return [
        ...minRange,
        () =>
        {
          return 0;
        },
        ...maxRange.reverse(),
      ];
    },
    [],
  );

  return {
    tickRange,
  };
};
