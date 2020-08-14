import React, {
  useCallback,
  useMemo,
} from "react";
import {
  withStyle,
} from "baseui/dist";
import {
  StyledTick,
} from "baseui/dist/slider";

import {
  SLIDER_TICK_COUNT,
} from "utils/Constants";

import {
  LeftAlignedTickBar,
} from "./TradeSliderTickBar.styled";

type Props = {
  maxPurchasable: number;
  setPurchaseAmount: React.Dispatch<React.SetStateAction<number>>;
};

const TradeSliderTickBar: React.FC<Props> = (
  {
    maxPurchasable,
    setPurchaseAmount,
  },
) =>
{
  const percentWidthPerShare = useMemo(
    () =>
    {
      return 100 / maxPurchasable;
    },
    [
      maxPurchasable,
    ],
  );
  const sharesPerTick = useMemo(
    () =>
    {
      return maxPurchasable / SLIDER_TICK_COUNT;
    },
    [
      maxPurchasable,
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
  const Tick = useMemo(
    () =>
    {
      return withStyle(
        StyledTick,
        (
          {
            $theme,
          },
        ) =>
        {
          return {
            ...$theme.typography.font100,
            margin: `0 calc(calc(${percentWidthPerShare * sharesPerTick}% - 14px) / 2)`,
            textAlign: "center",
            width: "14px",
            overflow: "visible",
            ":hover": {
              cursor: "pointer",
            },
          };
        },
      );
    },
    [
      percentWidthPerShare,
      sharesPerTick,
    ],
  );
  const handleTick = useCallback(
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

        setPurchaseAmount(
          tickValue,
        );
      }
    },
    [
      setPurchaseAmount,
    ],
  );

  return (
    <LeftAlignedTickBar>
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
                <Tick
                  key={index}
                  onClick={handleTick}
                >
                  {
                    Math.round(
                      (nextTickValue + tickValue) / 2,
                    )
                  }
                </Tick>
              );
            }

            return null;
          },
        )
      }
    </LeftAlignedTickBar>
  );
};

export default TradeSliderTickBar;
