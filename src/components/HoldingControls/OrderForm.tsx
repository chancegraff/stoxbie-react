import React, {
  useCallback,
  useState,
} from "react";
import {
  HistoricalPrice,
} from "@chancey/iex-cloud";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars
import {
  LedgerType,
} from "trade-types";

import Spinner from "components/Grommet/Spinner";
import ChooseShares from "components/ShareSlider/ChooseShares";

import {
  GrommetContainer,
  StoxbieSubmitOrder,
} from "./OrderForm.styled";

type Props = {
  presentPrice: HistoricalPrice | undefined;
  presentLedger: LedgerType;
  handleOpen: (orderAmount: number) => void;
};

const OrderForm: React.FC<Props> = (
  {
    presentPrice,
    presentLedger,
    handleOpen,
  },
) =>
{
  const [
    orderShareCount,
    setOrderShareCount,
  ] = useState<number>(
    0,
  );

  const handleSubmit = useCallback(
    () =>
    {
      if (orderShareCount !== 0)
      {
        handleOpen(
          orderShareCount,
        );
      }
    },
    [
      orderShareCount,
      handleOpen,
    ],
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
        orderShareCount={orderShareCount}
        setOrderShareCount={setOrderShareCount}
      />
      <StoxbieSubmitOrder
        css=""
        handleSubmit={handleSubmit}
      />
    </GrommetContainer>
  );
};

export default OrderForm;
