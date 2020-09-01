import React, {
  PropsHasClass,
  useMemo,
} from "react";
import {
  HistoricalTradeFinished,
} from "trade-types";

import {
  formatCount,
  formatCurrency,
} from "utils/Utilities";

import {
  GrommetTableCell,
  GrommetTableRow,
} from "./HistoricalRow.styled";

type Props = PropsHasClass & {
  historicalHolding: HistoricalTradeFinished;
};

const HistoricalRow: React.FC<Props> = (
  {
    className,
    historicalHolding,
  },
) =>
{
  const shares = useMemo(
    () =>
    {
      return formatCount(
        historicalHolding.closeCount,
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
        historicalHolding.openPrice,
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
        historicalHolding.closePrice,
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
        historicalHolding.closeCount * historicalHolding.closePrice,
      );
    },
    [
      historicalHolding,
    ],
  );

  return (
    <GrommetTableRow
      className={className}
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
