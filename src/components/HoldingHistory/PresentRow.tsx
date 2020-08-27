import React, {
  PropsHasChildren,
  useMemo,
} from "react";
import {
  HistoricalTradeStarted,
} from "trade-types";

import {
  formatCount,
  formatCurrency,
} from "utils/Utilities";

import {
  StyledTableCell,
  StyledTableRow,
} from "./PresentRow.styled";

type Props = PropsHasChildren & {
  summarizedHoldings: HistoricalTradeStarted;
};

const PresentRow: React.FC<Props> = (
  {
    children,
    summarizedHoldings,
  },
) =>
{
  const shareCount = useMemo(
    () =>
    {
      return formatCount(
        summarizedHoldings.openCount,
      );
    },
    [
      summarizedHoldings,
    ],
  );
  const openPrice = useMemo(
    () =>
    {
      return formatCurrency(
        summarizedHoldings.openPrice,
      );
    },
    [
      summarizedHoldings,
    ],
  );
  const totalBalance = useMemo(
    () =>
    {
      return formatCurrency(
        summarizedHoldings.openCount * summarizedHoldings.openPrice,
      );
    },
    [
      summarizedHoldings,
    ],
  );

  return (
    <StyledTableRow role="row">
      <StyledTableCell>
        {shareCount}
      </StyledTableCell>
      <StyledTableCell>
        {openPrice}
      </StyledTableCell>
      <StyledTableCell>
        {children}
      </StyledTableCell>
      <StyledTableCell>
        {totalBalance}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default PresentRow;
