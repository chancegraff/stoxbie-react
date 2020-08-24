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
} from "iex-cloud";
import {
  HistoricalLedger,
} from "trade-types";

import {
  usePrevious,
} from "utils/Utilities";
import TickBar from "components/HoldingControls/TickBar";

import {
  StyledContainer,
} from "./ShareSlider.styled";

type Props = {
  presentPrice: HistoricalPrice;
  presentLedger: HistoricalLedger;
  shareCount: number;
  shareModifier: number;
  setShareAmount: React.Dispatch<React.SetStateAction<number>>;
};

const ShareSlider: React.FC<Props> = (
  {
    presentPrice,
    presentLedger,
    shareCount,
    shareModifier,
    setShareAmount,
  },
) =>
{
  const previousPrice = usePrevious(
    presentPrice,
  );
  const previousLedger = usePrevious(
    presentLedger,
  );
  const hasPriceChanged = useMemo(
    () =>
    {
      return presentPrice !== previousPrice;
    },
    [
      presentPrice,
      previousPrice,
    ],
  );
  const hasBalanceChanged = useMemo(
    () =>
    {
      return presentLedger.totalBalance !== previousLedger?.totalBalance;
    },
    [
      presentLedger,
      previousLedger,
    ],
  );
  const maxPurchasable = useMemo(
    () =>
    {
      return Math.floor(
        presentLedger.totalBalance / presentPrice.close,
      );
    },
    [
      presentPrice,
      presentLedger,
    ],
  );
  const maxSaleable = useMemo(
    () =>
    {
      return presentLedger.totalCount;
    },
    [
      presentLedger,
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
      <TickBar
        maxValue={maxValue}
        setShareAmount={setShareAmount}
      />
    </StyledContainer>
  );
};

export default ShareSlider;
