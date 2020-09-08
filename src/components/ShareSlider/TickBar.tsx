import React, {
  useCallback,
  useMemo,
} from "react";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  SLIDER_TICK_COUNT,
} from "utils/Constants";

import {
  useTickRange,
} from "./hooks/useTickRange";
import {
  GrommetContainer,
  StoxbieTickItem,
} from "./TickBar.styled";

type Props = {
  ceiling: number;
  setOrderShareCount: React.Dispatch<React.SetStateAction<number>>;
};

const widthPercent = 100 / (SLIDER_TICK_COUNT * 2 + 1);

const TickBar: React.FC<Props> = (
  {
    ceiling,
    setOrderShareCount,
  },
) =>
{
  const valuesPerTick = useMemo(
    () =>
    {
      return ceiling / SLIDER_TICK_COUNT;
    },
    [
      ceiling,
    ],
  );
  const tickMargin = useMemo(
    () =>
    {
      return `0 calc(calc(${widthPercent}% - 14px) / 2)`;
    },
    [],
  );

  const {
    tickRange,
  } = useTickRange();

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
            const {
              current,
              next,
            } = tickValue(
              valuesPerTick,
            );

            const math = index < SLIDER_TICK_COUNT
              ? Math.floor
              : Math.ceil;
            const child = current;

            return (
              <StoxbieTickItem
                key={index}
                css=""
                onClick={handleClick}
              >
                {
                  math(
                    child,
                  )
                }
              </StoxbieTickItem>
            );
          },
        )
      }
    </GrommetContainer>
  );
};

export default TickBar;
