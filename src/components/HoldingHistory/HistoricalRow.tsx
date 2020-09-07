import React, {
  useMemo,
} from "react";
import {
  ClosedHolding,
} from "holding-types";

import {
  formatCount,
  formatCurrency,
} from "utils/Utilities";

import {
  GrommetTableCell,
  GrommetTableRow,
} from "./HistoricalRow.styled";

type Props = {
  historicalHolding: ClosedHolding;
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
        historicalHolding.close.amount,
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
        historicalHolding.open.price,
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
        historicalHolding.close.price,
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
        historicalHolding.close.amount * historicalHolding.close.price,
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
