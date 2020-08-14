import React, {
  useCallback,
  useEffect,
  useMemo,
} from "react";
import {
  Slider,
  State,
} from "baseui/dist/slider";
import {
  HistoricalPrice,
} from "iex";

import {
  usePrevious,
} from "utils/Utilities";
import TradeSliderInput from "components/TradeSliderInput";
import TradeSliderTickBar from "components/TradeSliderTickBar";

type Props = {
  currentPrice: HistoricalPrice;
  currentBalance: number;
  purchaseAmount: number;
  purchaseModifier: number;
  setPurchaseAmount: React.Dispatch<React.SetStateAction<number>>;
};

const TradeSlider: React.FC<Props> = (
  {
    currentPrice,
    currentBalance,
    purchaseAmount,
    purchaseModifier,
    setPurchaseAmount,
  },
) =>
{
  const previousPrice = usePrevious(
    currentPrice,
  );
  const previousBalance = usePrevious(
    currentBalance,
  );
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
      return Math.floor(
        currentBalance / currentPrice.close,
      );
    },
    [
      currentPrice,
      currentBalance,
    ],
  );
  const maxSaleable = useMemo(
    () =>
    {
      return 0;
    },
    [],
  );
  const maxValue = useMemo(
    () =>
    {
      return purchaseModifier > 0
        ? maxPurchasable
        : maxSaleable;
    },
    [
      purchaseModifier,
      maxPurchasable,
      maxSaleable,
    ],
  );
  const handleChange = useCallback(
    (
      event: State,
    ) =>
    {
      const [
        nextPurchaseAmount,
      ] = event.value;

      setPurchaseAmount(
        nextPurchaseAmount,
      );
    },
    [
      setPurchaseAmount,
    ],
  );
  const overrides = useMemo(
    () =>
    {
      return {
        TickBar: {
          component: () =>
          {
            return (
              <TradeSliderInput
                purchaseAmount={purchaseAmount}
                maxValue={maxValue}
                setPurchaseAmount={setPurchaseAmount}
              />
            );
          },
        },
      };
    },
    [
      purchaseAmount,
      maxValue,
      setPurchaseAmount,
    ],
  );

  useEffect(
    () =>
    {
      if (hasPriceChanged || hasBalanceChanged)
      {
        setPurchaseAmount(
          0,
        );
      }
    },
    [
      hasPriceChanged,
      hasBalanceChanged,
      setPurchaseAmount,
    ],
  );

  return (
    <>
      <Slider
        max={maxValue}
        overrides={overrides}
        value={
          [
            purchaseAmount,
          ]
        }
        onChange={handleChange}
      />
      <TradeSliderTickBar
        maxValue={maxValue}
        setPurchaseAmount={setPurchaseAmount}
      />
    </>
  );
};

export default TradeSlider;
