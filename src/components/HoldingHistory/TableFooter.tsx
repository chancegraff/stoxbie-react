import React, {
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
  GrommetTableCell,
  GrommetTableFooter,
  GrommetTableRow,
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
    <GrommetTableFooter css="">
      <GrommetTableRow
        css=""
        role="footerRow"
      >
        <GrommetTableCell css="">
          Change
        </GrommetTableCell>
        <GrommetTableCell css="">
          {change}
        </GrommetTableCell>
        <GrommetTableCell css="">
          Balance
        </GrommetTableCell>
        <GrommetTableCell css="">
          {balance}
        </GrommetTableCell>
      </GrommetTableRow>
    </GrommetTableFooter>
  );
};

export default TableFooter;
