import React, {
  useMemo,
} from "react";
import {
  HistoricalPrice,
} from "@chancey/iex-cloud";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars
import {
  HistoricalLedger,
  HistoricalTradeStarted,
} from "trade-types";

import {
  useHover,
} from "utils/hooks/useHover";
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
  presentLedger?: HistoricalLedger;
  presentHolding: HistoricalTradeStarted;
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
        return presentLedger.totalCount;
      }

      return presentHolding.openCount;
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
      orderDirection={(presentHolding.openDirection * -1) as 1 | -1}
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
