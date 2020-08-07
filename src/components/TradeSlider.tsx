import React, {
  useCallback, useEffect, useMemo,
} from "react";
import { styled } from "baseui/dist";
import {
  Slider,
  State,
  StyledTick,
  StyledTickBar,
} from "baseui/dist/slider";
import { HistoricalPrice } from "iex";

import { SLIDER_TICK_COUNT } from "services/Constants";
import { usePrevious } from "services/Utilities";

type Props = {
  currentPrice: HistoricalPrice;
  currentBalance: number;
  purchaseAmount: number;
  setPurchaseAmount: React.Dispatch<React.SetStateAction<number>>;
};

const TickBar = styled(
  StyledTickBar,
  () =>
  {
    return {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      paddingLeft: "18px",
      paddingRight: "16px",
    };
  },
);

const TradeSlider: React.FC<Props> = ({
  currentPrice,
  currentBalance,
  purchaseAmount,
  setPurchaseAmount,
}) =>
{
  const previousPrice = usePrevious(currentPrice);
  const previousBalance = usePrevious(currentBalance);
  const hasPriceChanged = useMemo(
    () =>
    {
      return currentPrice !== previousPrice;
    },
    [
      currentPrice,
      previousPrice,
    ],
  );
  const hasBalanceChanged = useMemo(
    () =>
    {
      return currentBalance !== previousBalance;
    },
    [
      currentBalance,
      previousBalance,
    ],
  );
  const maxPurchasable = useMemo(
    () =>
    {
      return Math.floor(currentBalance / currentPrice.close);
    },
    [
      currentPrice,
      currentBalance,
    ],
  );
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
      return styled(
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
  const handleChange = useCallback(
    (event: State) =>
    {
      const [ nextPurchaseAmount ] = event.value;

      setPurchaseAmount(nextPurchaseAmount);
    },
    [ setPurchaseAmount ],
  );

  useEffect(
    () =>
    {
      if (hasPriceChanged || hasBalanceChanged)
      {
        setPurchaseAmount(0);
      }
    },
    [
      hasPriceChanged,
      hasBalanceChanged,
      setPurchaseAmount,
    ],
  );

  return (
    <Slider
      max={maxPurchasable}
      onChange={handleChange}
      overrides={
        {
          TickBar: () =>
          {
            return (
              <TickBar>
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
              </TickBar>
            );
          },
        }
      }
      value={[ purchaseAmount ]}
    />
  );
};

export default TradeSlider;
