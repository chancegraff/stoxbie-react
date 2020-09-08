import React, {
  useMemo,
} from "react";
import {
  List,
} from "immutable";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars
import {
  HistoricalHolding,
  Ledger,
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
  presentLedger: Ledger;
  historicalHoldings: List<HistoricalHolding>;
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
      if (!historicalHoldings.isEmpty())
      {
        return formatPercentage(
          presentLedger.returns.percent,
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
          presentLedger.balance,
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
