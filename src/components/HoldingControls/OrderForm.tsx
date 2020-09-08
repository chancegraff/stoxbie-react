import React, {
  useState,
} from "react";
import {
  HistoricalPrice,
} from "@chancey/iex-cloud";
import {
  Ledger,
} from "holding-types";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import Spinner from "components/Grommet/Spinner";
import ChooseShares from "components/ShareSlider/ChooseShares";

import {
  GrommetContainer,
  StoxbieSubmitOrder,
} from "./OrderForm.styled";

type Props = {
  presentPrice: HistoricalPrice | undefined;
  presentLedger: Ledger;
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
        orderShareCount={orderShareCount}
        handleSubmit={handleOpen}
      />
    </GrommetContainer>
  );
};

export default OrderForm;
