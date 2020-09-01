import React, {
  PropsHasClass,
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
} from "utils/Hooks";
import HoverIcon from "components/Grommet/HoverIcon";

import {
  StyledClosedIcon,
  StyledContainer,
  StyledOpenedIcon,
  StyledSubmitOrder,
} from "./CloseHoldings.styled";

type Props = PropsHasClass & {
  presentPrice: HistoricalPrice;
  presentLedger: HistoricalLedger;
  presentHolding: HistoricalTradeStarted;
  handleSubmit: (sharePrice: number, shareCount: number) => void;
};

const CloseHoldings: React.FC<Props> = (
  {
    className,
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

  if (!presentHolding ||
      !presentPrice || !presentLedger)
  {
    return null;
  }

  return (
    <StyledSubmitOrder
      css=""
      className={className}
      presentPriceClose={presentPrice.close}
      orderDirection={(presentHolding.openDirection * -1) as 1 | -1}
      orderShareCount={presentLedger.totalCount}
      handleSubmit={handleSubmit}
    >
      <StyledContainer
        css=""
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <HoverIcon
          css=""
          hoverState={hoverState}
          MouseIdlingIcon={StyledOpenedIcon}
          MouseHoveringIcon={StyledClosedIcon}
        />
      </StyledContainer>
    </StyledSubmitOrder>
  );
};

export default CloseHoldings;
