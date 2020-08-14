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
import TradeSliderTickBar from "components/TradeSliderTickBar";

type Props = {
  currentPrice: HistoricalPrice;
  currentBalance: number;
  purchaseAmount: number;
  setPurchaseAmount: React.Dispatch<React.SetStateAction<number>>;
};

const TradeSlider: React.FC<Props> = (
  {
    currentPrice,
    currentBalance,
    purchaseAmount,
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
  const handleInputChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
    ) =>
    {
      const {
        target: {
          value,
        },
      } = event;
      const orderCount = parseInt(
        value,
        10,
      );
      const shareCount = Math.min(
        orderCount,
        maxPurchasable,
      );

      setPurchaseAmount(
        shareCount,
      );
    },
    [
      setPurchaseAmount,
      maxPurchasable,
    ],
  );
  const overrides = useMemo(
    () =>
    {
      return {
        TickBar: {
          component: (): JSX.Element =>
          {
            return (
              <input
                hidden={true}
                value={purchaseAmount}
                data-testid="sliderInput"
                onChange={handleInputChange}
              />
            );
          },
        },
      };
    },
    [
      purchaseAmount,
      handleInputChange,
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
        max={maxPurchasable}
        overrides={overrides}
        value={
          [
            purchaseAmount,
          ]
        }
        onChange={handleChange}
      />
      <TradeSliderTickBar
        maxPurchasable={maxPurchasable}
        setPurchaseAmount={setPurchaseAmount}
      />
    </>
  );
};

export default TradeSlider;
