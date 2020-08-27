import React, {
  PropsHasChildren,
  useMemo,
} from "react";
import {
  HistoricalTradeStarted,
} from "trade-types";

import {
  useHover,
} from "utils/Hooks";
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
  const {
    hoverState,
    handleMouseOver,
    handleMouseOut,
  } = useHover();

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
      role="row"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
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
};

export default PresentRow;
