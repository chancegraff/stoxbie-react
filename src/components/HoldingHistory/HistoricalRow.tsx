import React, {
  useMemo,
} from "react";
import {
  HistoricalHolding,
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
  historicalHolding: HistoricalHolding;
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
        historicalHolding.orders.historical.amount * historicalHolding.orders.historical.price,
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
