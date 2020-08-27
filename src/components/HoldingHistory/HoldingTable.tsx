import React from "react";
import {
  HistoricalPrice,
} from "iex-cloud";
import {
  HistoricalLedger,
  HistoricalTradeFinished,
  HistoricalTradeStarted,
} from "trade-types";

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
  return (
    <StyledTheme>
      <StyledContainer>
        <StyledTable>
          <TableHeader />
          <PresentBody summarizedHoldings={summarizedHoldings}>
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
