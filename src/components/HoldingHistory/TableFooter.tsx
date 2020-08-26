import React, {
  useMemo,
} from "react";
import {
  HistoricalLedger,
  HistoricalTradeFinished,
} from "trade-types";

import {
  formatCurrency,
  formatPercentage,
} from "utils/Utilities";

import {
  StyledTableCell,
  StyledTableFooter,
  StyledTableRow,
} from "./TableFooter.styled";

type Props = {
  presentLedger: HistoricalLedger | undefined;
  historicalHoldings: HistoricalTradeFinished[];
};

const TableFooter: React.FC<Props> = (
  {
    presentLedger,
    historicalHoldings,
  },
) =>
{
  const change = useMemo(
    () =>
    {
      if (presentLedger && historicalHoldings.length > 0)
      {
        return formatPercentage(
          presentLedger.totalChange,
        );
      }
    },
    [
      historicalHoldings,
      presentLedger,
    ],
  );
  const balance = useMemo(
    () =>
    {
      if (presentLedger)
      {
        return formatCurrency(
          presentLedger.totalBalance,
        );
      }
    },
    [
      presentLedger,
    ],
  );

  return (
    <StyledTableFooter>
      <StyledTableRow>
        <StyledTableCell>
          Change
        </StyledTableCell>
        <StyledTableCell>
          {change}
        </StyledTableCell>
        <StyledTableCell>
          Balance
        </StyledTableCell>
        <StyledTableCell>
          {balance}
        </StyledTableCell>
      </StyledTableRow>
    </StyledTableFooter>
  );
};

export default TableFooter;
