import React, {
  useCallback,
  useEffect,
  useMemo,
} from "react";
import {
  HistoricalPrice,
} from "@chancey/iex-cloud";
import {
  RangeInput,
} from "grommet";
import {
  Ledger,
} from "holding-types";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  usePrevious,
} from "utils/Utilities";
import TickBar from "components/ShareSlider/TickBar";

import {
  GrommetContainer,
} from "./ChooseShares.styled";

type Props = {
  presentPrice: HistoricalPrice;
  presentLedger: Ledger;
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
      return presentLedger.balance !== previousLedger?.balance;
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
        presentLedger.balance / presentPrice.close,
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
      return presentLedger.amounts.holding;
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
      if (hasPriceChanged ||
          hasBalanceChanged)
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
    <GrommetContainer css="">
      <RangeInput
        css=""
        role="slider"
        max={maxValue}
        value={orderShareCount}
        onChange={handleChange}
      />
      <TickBar
        css=""
        maxValue={maxValue}
        setOrderShareCount={setOrderShareCount}
      />
    </GrommetContainer>
  );
};

export default ChooseShares;
