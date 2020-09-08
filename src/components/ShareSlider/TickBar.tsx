import React, {
  useCallback,
  useMemo,
} from "react";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  SLIDER_TICK_COUNT,
} from "utils/Constants";

import {
  GrommetContainer,
  StoxbieTickItem,
} from "./TickBar.styled";

type Props = {
  ceiling: number;
  setOrderShareCount: React.Dispatch<React.SetStateAction<number>>;
};

const TickBar: React.FC<Props> = (
  {
    ceiling,
    setOrderShareCount,
  },
) =>
{
  const percentPerValue = useMemo(
    () =>
    {
      return 100 / ceiling;
    },
    [
      ceiling,
    ],
  );
  const valuesPerTick = useMemo(
    () =>
    {
      return ceiling / SLIDER_TICK_COUNT;
    },
    [
      ceiling,
    ],
  );
  const tickRange = useMemo(
    () =>
    {
      const maxRange = Array.from(
        Array(
          SLIDER_TICK_COUNT / 2 + 1,
        ),
        (
          element,
          index,
        ) =>
        {
          return valuesPerTick * index;
        },
      );

      const minRange = Array.from(
        Array(
          SLIDER_TICK_COUNT / 2 + 1,
        ),
        (
          element,
          index,
        ) =>
        {
          return valuesPerTick * index * -1;
        },
      );

      return [
        ...minRange,
        0,
        ...maxRange,
      ];
    },
    [
      valuesPerTick,
    ],
  );
  const tickMargin = useMemo(
    () =>
    {
      return `0 calc(calc(${percentPerValue * valuesPerTick}% - 14px) / 2)`;
    },
    [
      percentPerValue,
      valuesPerTick,
    ],
  );
  const handleClick = useCallback(
    (
      event: React.MouseEvent<HTMLDivElement>,
    ) =>
    {
      const {
        currentTarget: {
          textContent,
        },
      } = event;

      if (textContent)
      {
        const tickValue = parseInt(
          textContent,
          10,
        );

        setOrderShareCount(
          tickValue,
        );
      }
    },
    [
      setOrderShareCount,
    ],
  );

  return (
    <GrommetContainer css="">
      {
        tickRange.map(
          (
            tickValue,
            index,
          ) =>
          {
            const nextTickValue = tickRange[index + 1];

            if (nextTickValue)
            {
              return (
                <StoxbieTickItem
                  key={index}
                  css=""
                  margin={tickMargin}
                  onClick={handleClick}
                >
                  {
                    Math.round(
                      (nextTickValue + tickValue) / 2,
                    )
                  }
                </StoxbieTickItem>
              );
            }

            return null;
          },
        )
      }
    </GrommetContainer>
  );
};

export default TickBar;
