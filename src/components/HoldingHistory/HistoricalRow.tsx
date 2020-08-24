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
      if (historicalHolding.closeCount)
      {
        return formatCount(
          historicalHolding.closeCount,
        );
      }
      else if (historicalHolding.openCount)
      {
        return formatCount(
          historicalHolding.openCount,
        );
      }
    },
    [
      historicalHolding,
    ],
  );
  const open = useMemo(
    () =>
    {
      if (historicalHolding.openPrice)
      {
        return formatCurrency(
          historicalHolding.openPrice,
        );
      }
    },
    [
      historicalHolding,
    ],
  );
  const close = useMemo(
    () =>
    {
      if (historicalHolding.closePrice)
      {
        const abbreviatedClose = formatCurrency(
          historicalHolding.closePrice,
        );

        return abbreviatedClose;
      }
    },
    [
      historicalHolding,
    ],
  );
  const balance = useMemo(
    () =>
    {
      if (historicalHolding.closeCount && historicalHolding.closePrice)
      {
        return formatCurrency(
          historicalHolding.closeCount * historicalHolding.closePrice,
        );
      }
      else if (historicalHolding.openCount && historicalHolding.openPrice)
      {
        return formatCurrency(
          historicalHolding.openCount * historicalHolding.openPrice,
        );
      }
    },
    [
      historicalHolding,
    ],
  );

  return (
    <StyledTableRow>
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
