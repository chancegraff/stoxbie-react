import React, {
  useMemo,
} from "react";
import {
  HistoricalPrice,
} from "@chancey/iex-cloud";
import {
  Ledger,
  PresentHoldingType,
  OppositeTradeDirection,
} from "holding-types";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  useHover,
} from "utils/Hooks";
import HoverIcon from "components/Grommet/HoverIcon";

import {
  GrommetClosedIcon,
  GrommetContainer,
  GrommetOpenedIcon,
  StoxbieSubmitOrder,
} from "./CloseHoldings.styled";

type Props = {
  disabled?: boolean;
  presentPrice: HistoricalPrice;
  presentLedger?: Ledger;
  presentHolding: PresentHoldingType;
  handleSubmit: (sharePrice: number, shareCount: number) => void;
};

const CloseHoldings: React.FC<Props> = (
  {
    disabled,
    presentPrice,
    presentLedger,
    presentHolding,
    handleSubmit,
  },
) =>
{
  const [
    hoverState,
    handleMouseEnter,
    handleMouseLeave,
  ] = useHover();

  const orderShareCount = useMemo(
    () =>
    {
      if (presentLedger)
      {
        return presentLedger.amounts.holding;
      }

      return presentHolding.open.amount;
    },
    [
      presentLedger,
      presentHolding,
    ],
  );

  return (
    <StoxbieSubmitOrder
      css=""
      disabled={disabled}
      presentPriceClose={presentPrice.close}
      orderDirection={
        OppositeTradeDirection(
          presentHolding.open.direction,
        )
      }
      orderShareCount={orderShareCount}
      handleSubmit={handleSubmit}
    >
      <GrommetContainer
        css=""
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <HoverIcon
          css=""
          disabled={disabled}
          hoverState={hoverState}
          MouseIdlingIcon={GrommetOpenedIcon}
          MouseHoveringIcon={GrommetClosedIcon}
        />
      </GrommetContainer>
    </StoxbieSubmitOrder>
  );
};

export default CloseHoldings;
