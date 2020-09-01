import React, {
  PropsHasClass,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  HistoricalPrice,
} from "@chancey/iex-cloud";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars
import {
  HistoricalLedger,
} from "trade-types";

import {
  handleUnloadCreator,
} from "utils/Utilities";
import Spinner from "components/Grommet/Spinner";
import ChooseShares from "components/ShareSlider/ChooseShares";

import {
  StyledBuyAction,
  StyledContainer,
  StyledGrid,
  StyledSellAction,
} from "./OrderForm.styled";

type Props = PropsHasClass & {
  presentPrice: HistoricalPrice | undefined;
  presentLedger: HistoricalLedger | undefined;
  handleSubmit: (sharePrice: number, shareCount: number) => void;
};

const OrderForm: React.FC<Props> = (
  {
    className,
    presentPrice,
    presentLedger,
    handleSubmit,
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

  if (!presentPrice ||
      !presentLedger)
  {
    return (
      <Spinner
        css=""
        className={className}
        Container={StyledContainer}
      />
    );
  }

  return (
    <StyledContainer
      css=""
      className={className}
    >
      <ChooseShares
        css=""
        presentLedger={presentLedger}
        presentPrice={presentPrice}
        orderDirection={orderDirection}
        orderShareCount={orderShareCount}
        setOrderShareCount={setOrderShareCount}
      />
      <StyledGrid css="">
        <StyledBuyAction
          css=""
          handleToggle={handleToggle}
          handleSubmit={handleSubmit}
          presentPriceClose={presentPrice.close}
          orderDirection={orderDirection}
          orderShareCount={orderShareCount}
        />
        <StyledSellAction
          css=""
          handleToggle={handleToggle}
          handleSubmit={handleSubmit}
          presentPriceClose={presentPrice.close}
          orderDirection={orderDirection}
          orderShareCount={orderShareCount}
        />
      </StyledGrid>
    </StyledContainer>
  );
};

export default OrderForm;
