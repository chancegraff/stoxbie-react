import React, {
  PropsHasChildren,
  useRef,
} from "react";
import {
  HistoricalTradeStarted,
} from "trade-types";

import {
  HandleMouseEnter,
  HandleMouseLeave,
  HoverState,
} from "utils/Hooks";

import {
  StyledTableBody,
} from "./PresentBody.styled";
import PresentRow from "./PresentRow";
import ToggleCombined from "./ToggleCombined";

type Props = PropsHasChildren & {
  summarizedHoldings: HistoricalTradeStarted | undefined;
  rowHoverState: HoverState;
  handleMouseEnterRow: HandleMouseEnter;
  handleMouseLeaveRow: HandleMouseLeave;
};

const PresentBody: React.FC<Props> = (
  {
    children,
    summarizedHoldings,
    rowHoverState,
    handleMouseEnterRow,
    handleMouseLeaveRow,
  },
) =>
{
  const presentRowRef = useRef<HTMLTableRowElement>();

  if (!summarizedHoldings)
  {
    return null;
  }

  return (
    <StyledTableBody
      onMouseEnter={handleMouseEnterRow}
      onMouseLeave={handleMouseLeaveRow}
    >
      <PresentRow
        ref={presentRowRef}
        summarizedHoldings={summarizedHoldings}
      >
        {children}
      </PresentRow>
      <ToggleCombined
        rowToTarget={presentRowRef.current}
        rowHoverState={rowHoverState}
      />
    </StyledTableBody>
  );
};

export default PresentBody;
