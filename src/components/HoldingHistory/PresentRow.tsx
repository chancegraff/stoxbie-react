import React, {
  PropsHasChildren,
  useMemo,
  useRef,
} from "react";
import {
  HistoricalTradeStarted,
} from "trade-types";

import {
  HoverState,
} from "utils/Hooks";
import {
  formatCount,
  formatCurrency,
} from "utils/Utilities";

import {
  StyledTableCell,
  StyledTableRow,
} from "./PresentRow.styled";
import ToggleCombined from "./ToggleCombined";

type Props = PropsHasChildren & {
  summarizedHoldings: HistoricalTradeStarted;
  hoverState: HoverState;
};

const PresentRow: React.FC<Props> = (
  {
    children,
    summarizedHoldings,
    hoverState,
  },
) =>
{
  const presentRowRef = useRef<HTMLTableRowElement>();

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
      ref={presentRowRef}
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
      <ToggleCombined
        hoverState={hoverState}
        presentRow={presentRowRef.current}
      />
    </StyledTableRow>
  );
};

export default PresentRow;
