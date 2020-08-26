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
import TickBar from "components/ShareSlider/TickBar";

import {
  StyledContainer,
} from "./ChooseShares.styled";

type Props = {
  presentPrice: HistoricalPrice;
  presentLedger: HistoricalLedger;
  orderDirection: number;
  orderShareCount: number;
  setOrderShareCount: React.Dispatch<React.SetStateAction<number>>;
};

const ChooseShares: React.FC<Props> = (
  {
    presentPrice,
    presentLedger,
    orderDirection,
    orderShareCount,
    setOrderShareCount,
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
      return orderDirection > 0
        ? maxPurchasable
        : maxSaleable > 0
          ? maxSaleable
          : maxPurchasable;
    },
    [
      orderDirection,
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

      setOrderShareCount(
        parseInt(
          nextPurchaseAmount,
          10,
        ),
      );
    },
    [
      setOrderShareCount,
    ],
  );

  useEffect(
    () =>
    {
      if (hasPriceChanged || hasBalanceChanged)
      {
        setOrderShareCount(
          0,
        );
      }
    },
    [
      hasPriceChanged,
      hasBalanceChanged,
      setOrderShareCount,
    ],
  );

  return (
    <StyledContainer>
      <RangeInput
        max={maxValue}
        value={orderShareCount}
        onChange={handleChange}
      />
      <TickBar
        maxValue={maxValue}
        setOrderShareCount={setOrderShareCount}
      />
    </StyledContainer>
  );
};

export default ChooseShares;
