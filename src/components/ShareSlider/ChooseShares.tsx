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
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars
import {
  Ledger,
} from "trade-types";

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
  orderShareCount: number;
  setOrderShareCount: React.Dispatch<React.SetStateAction<number>>;
};

const ChooseShares: React.FC<Props> = (
  {
    presentPrice,
    presentLedger,
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
  const purchasable = useMemo(
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
        min={purchasable}
        max={purchasable * -1}
        value={orderShareCount}
        onChange={handleChange}
      />
      <TickBar
        css=""
        ceiling={purchasable}
        setOrderShareCount={setOrderShareCount}
      />
    </GrommetContainer>
  );
};

export default ChooseShares;
