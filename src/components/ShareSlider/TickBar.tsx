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

type Props = PropsHasClass & {
  maxValue: number;
  setOrderShareCount: React.Dispatch<React.SetStateAction<number>>;
};

const TickBar: React.FC<Props> = (
  {
    className,
    maxValue,
    setOrderShareCount,
  },
) =>
{
  const percentWidthPerShare = useMemo(
    () =>
    {
      return 100 / maxValue;
    },
    [
      maxValue,
    ],
  );
  const sharesPerTick = useMemo(
    () =>
    {
      return maxValue / SLIDER_TICK_COUNT;
    },
    [
      maxValue,
    ],
  );
  const tickRange = useMemo(
    () =>
    {
      return Array.from(
        Array(
          SLIDER_TICK_COUNT + 1,
        ),
        (
          element,
          index,
        ) =>
        {
          return sharesPerTick * index;
        },
      );
    },
    [
      sharesPerTick,
    ],
  );
  const tickMargin = useMemo(
    () =>
    {
      return `0 calc(calc(${percentWidthPerShare * sharesPerTick}% - 14px) / 2)`;
    },
    [
      percentWidthPerShare,
      sharesPerTick,
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
    <GrommetContainer
      className={className}
      css=""
    >
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
