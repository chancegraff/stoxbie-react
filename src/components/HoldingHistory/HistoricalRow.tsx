import React, {
  useMemo,
} from "react";
import {
  HistoricalHoldingType,
} from "trade-types";

import {
  formatCount,
  formatCurrency,
} from "utils/Utilities";

import {
  GrommetTableCell,
  GrommetTableRow,
} from "./HistoricalRow.styled";

type Props = {
  historicalHolding: HistoricalHoldingType;
};

const HistoricalRow: React.FC<Props> = (
  {
    historicalHolding,
  },
) =>
{
  const shares = useMemo(
    () =>
    {
      return formatCount(
        historicalHolding.orders.historical.amount,
      );
    },
    [
      historicalHolding,
    ],
  );
  const open = useMemo(
    () =>
    {
      return formatCurrency(
        historicalHolding.orders.present.price,
      );
    },
    [
      historicalHolding,
    ],
  );
  const close = useMemo(
    () =>
    {
      const abbreviatedClose = formatCurrency(
        historicalHolding.orders.historical.price,
      );

      return abbreviatedClose;
    },
    [
      historicalHolding,
    ],
  );
  const balance = useMemo(
    () =>
    {
      return formatCurrency(
        historicalHolding.orders.historical.balance,
      );
    },
    [
      historicalHolding,
    ],
  );

  return (
    <GrommetTableRow
      css=""
      role="row"
    >
      <GrommetTableCell css="">
        {shares}
      </GrommetTableCell>
      <GrommetTableCell css="">
        {open}
      </GrommetTableCell>
      <GrommetTableCell css="">
        {close}
      </GrommetTableCell>
      <GrommetTableCell css="">
        {balance}
      </GrommetTableCell>
    </GrommetTableRow>
  );
};

export default HistoricalRow;
