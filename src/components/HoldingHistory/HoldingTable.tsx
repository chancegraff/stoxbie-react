import React from "react";
import {
  HistoricalPrice,
} from "iex-cloud";
import {
  HistoricalLedger,
  HistoricalTradeFinished,
  HistoricalTradeStarted,
} from "trade-types";
import {
  useDebouncedCallback,
} from "use-debounce/lib";

import {
  DEBOUNCE_MEDIUM_MS,
} from "../../utils/Constants";
import {
  useHover,
} from "../../utils/Hooks";

import CloseHoldings from "./CloseHoldings";
import HistoricalBody from "./HistoricalBody";
import {
  StyledContainer,
  StyledTable,
  StyledTheme,
} from "./HoldingTable.styled";
import PresentBody from "./PresentBody";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";

type Props = {
  presentPrice: HistoricalPrice | undefined;
  presentLedger: HistoricalLedger | undefined;
  historicalHoldings: HistoricalTradeFinished[];
  summarizedHoldings: HistoricalTradeStarted | undefined;
  handleSubmit: (sharePrice: number, shareCount: number) => void;
};

const HoldingTable: React.FC<Props> = (
  {
    presentPrice,
    presentLedger,
    historicalHoldings,
    summarizedHoldings,
    handleSubmit,
  },
) =>
{
  const [
    hoverState,
    handleMouseEnter,
    handleMouseLeave,
  ] = useHover();

  const [
    debouncedMouseLeave,
  ] = useDebouncedCallback(
    handleMouseLeave,
    DEBOUNCE_MEDIUM_MS,
  );

  return (
    <StyledTheme>
      <StyledContainer
        onScroll={handleMouseLeave}
        onMouseLeave={debouncedMouseLeave}
      >
        <StyledTable>
          <TableHeader />
          <PresentBody
            summarizedHoldings={summarizedHoldings}
            hoverState={hoverState}
            handleMouseEnter={handleMouseEnter}
          >
            <CloseHoldings
              presentPrice={presentPrice}
              presentLedger={presentLedger}
              summarizedHoldings={summarizedHoldings}
              handleSubmit={handleSubmit}
            />
          </PresentBody>
          <HistoricalBody historicalHoldings={historicalHoldings} />
          <TableFooter
            historicalHoldings={historicalHoldings}
            presentLedger={presentLedger}
          />
        </StyledTable>
      </StyledContainer>
    </StyledTheme>
  );
};

export default HoldingTable;
