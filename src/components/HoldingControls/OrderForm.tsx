import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  HistoricalPrice,
} from "@chancey/iex-cloud";
import {
  Ledger,
} from "holding-types";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  handleUnloadCreator,
} from "utils/Utilities";
import Spinner from "components/Grommet/Spinner";
import ChooseShares from "components/ShareSlider/ChooseShares";

import {
  GrommetContainer,
  GrommetGrid,
  StoxbieBuyAction,
  StoxbieSellAction,
} from "./OrderForm.styled";

type Props = {
  presentPrice: HistoricalPrice | undefined;
  presentLedger: Ledger;
  handleOrder: (sharePrice: number, shareCount: number) => void;
};

const OrderForm: React.FC<Props> = (
  {
    presentPrice,
    presentLedger,
    handleOrder,
  },
) =>
{
  const [
    orderShareCount,
    setOrderShareCount,
  ] = useState<number>(
    0,
  );
  const [
    orderDirection,
    setOrderDirection,
  ] = useState<1 | -1>(
    1,
  );

  const handleToggle = useCallback(
    () =>
    {
      setOrderShareCount(
        0,
      );

      if (orderDirection > 0)
      {
        setOrderDirection(
          -1,
        );
      }
      else
      {
        setOrderDirection(
          1,
        );
      }
    },
    [
      orderDirection,
    ],
  );

  useEffect(
    () =>
    {
      return handleUnloadCreator(
        [
          setOrderShareCount,
          setOrderDirection,
        ],
      );
    },
    [],
  );

  if (!presentPrice)
  {
    return (
      <Spinner
        css=""
        Container={GrommetContainer}
      />
    );
  }

  return (
    <GrommetContainer css="">
      <ChooseShares
        css=""
        presentLedger={presentLedger}
        presentPrice={presentPrice}
        orderDirection={orderDirection}
        orderShareCount={orderShareCount}
        setOrderShareCount={setOrderShareCount}
      />
      <GrommetGrid css="">
        <StoxbieBuyAction
          css=""
          handleToggle={handleToggle}
          handleOrder={handleOrder}
          presentPriceClose={presentPrice.close}
          orderDirection={orderDirection}
          orderShareCount={orderShareCount}
        />
        <StoxbieSellAction
          css=""
          handleToggle={handleToggle}
          handleOrder={handleOrder}
          presentPriceClose={presentPrice.close}
          orderDirection={orderDirection}
          orderShareCount={orderShareCount}
        />
      </GrommetGrid>
    </GrommetContainer>
  );
};

export default OrderForm;
