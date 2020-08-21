import React, {
  useCallback,
  useEffect,
  useMemo,
} from "react";
import {
  RangeInput,
} from "grommet";
import {
  HistoricalPrice,
} from "iex";

import {
  usePrevious,
} from "utils/Utilities";
import TradeSliderTickBar from "components/TradeControl/TickBar";

import {
  StyledContainer,
} from "./TradeSlider.styled";

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
      event: React.ChangeEvent<HTMLInputElement>,
    ) =>
    {
      const {
        value: nextPurchaseAmount,
      } = event.target;

      setShareAmount(
        parseInt(
          nextPurchaseAmount,
          10,
        ),
      );
    },
    [
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
    <StyledContainer>
      <RangeInput
        max={maxValue}
        value={shareCount}
        onChange={handleChange}
      />
      <TradeSliderTickBar
        maxValue={maxValue}
        setShareAmount={setShareAmount}
      />
    </StyledContainer>
  );
};

export default TradeSlider;
