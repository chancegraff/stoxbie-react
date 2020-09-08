import {
  useMemo,
} from "react";

import {
  SLIDER_TICK_COUNT,
} from "utils/Constants";

const SliderValues = Array(
  SLIDER_TICK_COUNT,
);

const ReversedIndex = (
  index: number,
) =>
{
  return SliderValues.length - index;
};

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
      const currentIndex = ReversedIndex(
        index,
      );
      const nextIndex = ReversedIndex(
        index + 1,
      );

      return {
        current: tickValue * currentIndex * direction,
        next: tickValue * nextIndex * direction,
      };
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
          return {
            current: 0,
            next: 0,
          };
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
