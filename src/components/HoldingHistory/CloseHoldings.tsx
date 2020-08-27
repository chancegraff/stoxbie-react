import React from "react";
import {
  HistoricalPrice,
} from "iex-cloud";
import {
  HistoricalLedger,
  HistoricalTradeStarted,
} from "trade-types";

import {
  useHover,
} from "utils/Hooks";
import HoverIcon from "components/Grommet/HoverIcon";

import {
  StyledClosedIcon,
  StyledContainer,
  StyledOpenedIcon,
  StyledSubmitOrder,
} from "./CloseHoldings.styled";

type Props = {
  presentPrice: HistoricalPrice | undefined;
  presentLedger: HistoricalLedger | undefined;
  summarizedHoldings: HistoricalTradeStarted | undefined;
  handleSubmit: (sharePrice: number, shareCount: number) => void;
};

const CloseHoldings: React.FC<Props> = (
  {
    presentPrice,
    presentLedger,
    summarizedHoldings,
    handleSubmit,
  },
) =>
{
  const {
    hoverState,
    handleMouseOver,
    handleMouseOut,
  } = useHover();

  if (!summarizedHoldings || !presentPrice || !presentLedger)
  {
    return null;
  }

  return (
    <StyledSubmitOrder
      presentPriceClose={presentPrice.close}
      orderDirection={(summarizedHoldings.openDirection * -1) as 1 | -1}
      orderShareCount={presentLedger.totalCount}
      handleSubmit={handleSubmit}
    >
      <StyledContainer
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <HoverIcon
          hoverState={hoverState}
          MouseOverIcon={StyledClosedIcon}
          MouseOutIcon={StyledOpenedIcon}
        />
      </StyledContainer>
    </StyledSubmitOrder>
  );
};

export default CloseHoldings;
