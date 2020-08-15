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
  currentLedger: HistoricalLedger;
  shareCount: number;
  shareModifier: number;
  setShareAmount: React.Dispatch<React.SetStateAction<number>>;
};

const TradeSlider: React.FC<Props> = (
  {
    currentPrice,
    currentLedger,
    shareCount,
    shareModifier,
    setShareAmount,
  },
) =>
{
  const previousPrice = usePrevious(
    currentPrice,
  );
  const previousLedger = usePrevious(
    currentLedger,
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
      return currentLedger.totalBalance !== previousLedger?.totalBalance;
    },
    [
      currentLedger,
      previousLedger,
    ],
  );
  const maxPurchasable = useMemo(
    () =>
    {
      return Math.floor(
        currentLedger.totalBalance / currentPrice.close,
      );
    },
    [
      currentPrice,
      currentLedger,
    ],
  );
  const maxSaleable = useMemo(
    () =>
    {
      return currentLedger.totalCount;
    },
    [
      currentLedger,
    ],
  );
  const maxValue = useMemo(
    () =>
    {
      return shareModifier > 0
        ? maxPurchasable
        : maxSaleable > 0
          ? maxSaleable
          : maxPurchasable;
    },
    [
      shareModifier,
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

      setShareAmount(
        nextPurchaseAmount,
      );
    },
    [
      setShareAmount,
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
                shareCount={shareCount}
                maxValue={maxValue}
                setShareAmount={setShareAmount}
              />
            );
          },
        },
      };
    },
    [
      shareCount,
      maxValue,
      setShareAmount,
    ],
  );

  useEffect(
    () =>
    {
      if (hasPriceChanged || hasBalanceChanged)
      {
        setShareAmount(
          0,
        );
      }
    },
    [
      hasPriceChanged,
      hasBalanceChanged,
      setShareAmount,
    ],
  );

  return (
    <>
      <Slider
        max={maxValue}
        overrides={overrides}
        value={
          [
            shareCount,
          ]
        }
        onChange={handleChange}
      />
      <TradeSliderTickBar
        maxValue={maxValue}
        setShareAmount={setShareAmount}
      />
    </>
  );
};

export default TradeSlider;
