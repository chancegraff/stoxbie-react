import React from "react";
import {
  HistoricalTradeFinished,
} from "trade-types";

import {
  StyledContainer,
  StyledTable,
  StyledTheme,
} from "./HoldingTable.styled";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";

type Props = {
  historicalHoldings: HistoricalTradeFinished[];
};

const HoldingTable: React.FC<Props> = (
  {
    historicalHoldings,
  },
) =>
{
  return (
    <StyledTheme>
      <StyledContainer>
        <StyledTable>
          <TableHeader />
          <TableBody
            historicalHoldings={historicalHoldings.concat(historicalHoldings, historicalHoldings, historicalHoldings)}
          />
          <TableFooter />
        </StyledTable>
      </StyledContainer>
    </StyledTheme>
  );
};

export default HoldingTable;
