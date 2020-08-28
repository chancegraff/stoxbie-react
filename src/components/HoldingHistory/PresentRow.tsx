import React, {
  forwardRef,
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

const PresentRow = forwardRef<HTMLTableRowElement | undefined, Props>(
  (
    {
      children,
      summarizedHoldings,
    },
    tableRowRef,
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
      <StyledTableRow
        ref={tableRowRef}
        role="row"
      >
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
  },
);

export default PresentRow;
