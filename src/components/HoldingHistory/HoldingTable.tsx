import React from "react";
import {
  HistoricalTradeFinished,
} from "trade-types";

import {
  StyledTable,
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
    <StyledTable>
      <TableHeader />
      <TableBody />
      <TableFooter />
    </StyledTable>
  );
};

export default HoldingTable;
