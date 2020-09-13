import React, {
  useMemo,
} from "react";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars
import {
  LedgerType,
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
  presentLedger: LedgerType;
};

const TableFooter: React.FC<Props> = (
  {
    presentLedger,
  },
) =>
{
  const change = useMemo(
    () =>
    {
      return formatPercentage(
        presentLedger.returns.percent,
      );
    },
    [
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
        data-testid="footerRow"
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
