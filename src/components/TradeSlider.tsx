import React, {
  useCallback,
  useEffect,
  useMemo,
} from "react";
import {
  SharedProps,
  Slider,
  State,
} from "baseui/dist/slider";
import { HistoricalPrice } from "iex";

import { usePrevious } from "services/Utilities";

import { TickBar } from "./TradeSlider.overrides";

type Props = {
  currentPrice: HistoricalPrice;
  currentBalance: number;
  purchaseAmount: number;
  setPurchaseAmount: React.Dispatch<React.SetStateAction<number>>;
};

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
  const handleChange = useCallback(
    (event: State) =>
    {
      const [ nextPurchaseAmount ] = event.value;

      setPurchaseAmount(nextPurchaseAmount);
    },
    [ setPurchaseAmount ],
  );
  const overrides = useMemo(
    () =>
    {
      return {
        TickBar: {
          component: (props: SharedProps): JSX.Element =>
          {
            return (
              <TickBar
                {...props}
                maxPurchasable={maxPurchasable}
                setPurchaseAmount={setPurchaseAmount}
              />
            );
          },
        },
      };
    },
    [
      maxPurchasable,
      setPurchaseAmount,
    ],
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
      overrides={overrides}
      value={[ purchaseAmount ]}
      onChange={handleChange}
    />
  );
};

export default TradeSlider;
