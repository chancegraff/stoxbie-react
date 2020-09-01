import React, {
  PropsHasClass,
  useMemo,
} from "react";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars
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

type Props = PropsHasClass & {
  presentLedger: HistoricalLedger | undefined;
  historicalHoldings: HistoricalTradeFinished[];
};

const TableFooter: React.FC<Props> = (
  {
    className,
    presentLedger,
    historicalHoldings,
  },
) =>
{
  const change = useMemo(
    () =>
    {
      if (presentLedger &&
          historicalHoldings.length > 0)
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
    <StyledTableFooter
      css=""
      className={className}
    >
      <StyledTableRow
        css=""
        role="footerRow"
      >
        <StyledTableCell css="">
          Change
        </StyledTableCell>
        <StyledTableCell css="">
          {change}
        </StyledTableCell>
        <StyledTableCell css="">
          Balance
        </StyledTableCell>
        <StyledTableCell css="">
          {balance}
        </StyledTableCell>
      </StyledTableRow>
    </StyledTableFooter>
  );
};

export default TableFooter;
