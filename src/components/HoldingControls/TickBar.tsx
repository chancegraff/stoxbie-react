import React, {
  useCallback,
  useMemo,
} from "react";

import {
  SLIDER_TICK_COUNT,
} from "utils/Constants";

import {
  StyledContainer,
  StyledTickItem,
} from "./TickBar.styled";

type Props = {
  maxValue: number;
  setShareAmount: React.Dispatch<React.SetStateAction<number>>;
};

const TickBar: React.FC<Props> = (
  {
    maxValue,
    setShareAmount,
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

        setShareAmount(
          tickValue,
        );
      }
    },
    [
      setShareAmount,
    ],
  );

  return (
    <StyledContainer>
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
                <StyledTickItem
                  key={index}
                  margin={tickMargin}
                  onClick={handleClick}
                >
                  {
                    Math.round(
                      (nextTickValue + tickValue) / 2,
                    )
                  }
                </StyledTickItem>
              );
            }

            return null;
          },
        )
      }
    </StyledContainer>
  );
};

export default TickBar;
