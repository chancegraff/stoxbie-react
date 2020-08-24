import React from "react";
import {
  HistoricalTradeFinished,
} from "trade-types";

import {
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
      <StyledTable>
        <TableHeader />
        <TableBody />
        <TableFooter />
      </StyledTable>
    </StyledTheme>
  );
};

export default HoldingTable;
