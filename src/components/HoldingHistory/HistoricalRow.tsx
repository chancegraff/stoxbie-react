import React, {
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
  StyledTableCell,
  StyledTableRow,
} from "./HistoricalRow.styled";

type Props = {
  historicalHolding: HistoricalTradeFinished;
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
    <StyledTableRow role="row">
      <StyledTableCell>
        {shares}
      </StyledTableCell>
      <StyledTableCell>
        {open}
      </StyledTableCell>
      <StyledTableCell>
        {close}
      </StyledTableCell>
      <StyledTableCell>
        {balance}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default HistoricalRow;
