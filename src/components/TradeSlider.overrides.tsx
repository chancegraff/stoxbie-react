import React, {
  useCallback,
  useMemo,
} from "react";
import {
  SharedProps,
  StyledTick,
} from "baseui/dist/slider";
import { withStyle } from "styletron-react";

import { SLIDER_TICK_COUNT } from "services/Constants";

import { LeftAlignedTickBar } from "./TradeSlider.styled";

type Props = {
  maxPurchasable: number;
  setPurchaseAmount: React.Dispatch<React.SetStateAction<number>>;
};

export const TickBar: React.FC<SharedProps & Props> = ({
  maxPurchasable,
  setPurchaseAmount,
}) =>
{
  const percentWidthPerShare = useMemo(
    () =>
    {
      return 100 / maxPurchasable;
    },
    [ maxPurchasable ],
  );

  const sharesPerTick = useMemo(
    () =>
    {
      return maxPurchasable / SLIDER_TICK_COUNT;
    },
    [ maxPurchasable ],
  );

  const tickRange = useMemo(
    () =>
    {
      return Array.from(
        Array(SLIDER_TICK_COUNT + 1),
        (
          element,
          index,
        ) =>
        {
          return sharesPerTick * index;
        },
      );
    },
    [ sharesPerTick ],
  );

  const Tick = useMemo(
    () =>
    {
      return withStyle(
        StyledTick,
        ({ $theme }) =>
        {
          return {
            ...$theme.typography.font100,
            ":hover": { cursor: "pointer" },
            margin: `0 calc(calc(${percentWidthPerShare * sharesPerTick}% - 14px) / 2)`,
            textAlign: "center",
            width: "14px",
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
    (event: React.MouseEvent<HTMLDivElement>) =>
    {
      const { currentTarget: { textContent } } = event;

      if (textContent)
      {
        const tickValue = parseInt(
          textContent,
          10,
        );

        setPurchaseAmount(tickValue);
      }
    },
    [ setPurchaseAmount ],
  );

  return (
    <LeftAlignedTickBar>
      {
        tickRange.map((
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
                {Math.round((nextTickValue + tickValue) / 2)}
              </Tick>
            );
          }

          return null;
        })
      }
    </LeftAlignedTickBar>
  );
};
