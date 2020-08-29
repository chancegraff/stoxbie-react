import React, {
  useRef,
} from "react";
import {
  HistoricalPrice,
} from "iex-cloud";
import {
  HistoricalLedger,
  HistoricalTradeStarted,
} from "trade-types";

import {
  CombinedBodyState,
} from "utils/Constants";
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

type Props = {
  highestPresentHolding: HistoricalTradeStarted | undefined;
  presentLedger: HistoricalLedger | undefined;
  presentPrice: HistoricalPrice | undefined;
  rowHoverState: HoverState;
  combinedBodyState: CombinedBodyState;
  handleSubmit: (sharePrice: number, shareCount: number) => void;
  handleMouseEnterRow: HandleMouseEnter;
  handleMouseLeaveRow: HandleMouseLeave;
  handleToggleCombined: () => void;
};

const PresentBody: React.FC<Props> = (
  {
    highestPresentHolding,
    presentLedger,
    presentPrice,
    rowHoverState,
    combinedBodyState,
    handleSubmit,
    handleMouseEnterRow,
    handleMouseLeaveRow,
    handleToggleCombined,
  },
) =>
{
  const presentRowRef = useRef<HTMLTableRowElement>();

  if (!highestPresentHolding || !presentLedger || !presentPrice)
  {
    return null;
  }

  return (
    <StyledTableBody
      onMouseEnter={handleMouseEnterRow}
      onMouseLeave={handleMouseLeaveRow}
    >
      <ToggleCombined
        rowToTarget={presentRowRef.current}
        rowHoverState={rowHoverState}
        handleToggleCombined={handleToggleCombined}
        combinedBodyState={combinedBodyState}
      />
      <PresentRow
        ref={presentRowRef}
        presentLedger={presentLedger}
        presentPrice={presentPrice}
        presentHolding={highestPresentHolding}
        handleSubmit={handleSubmit}
      />
    </StyledTableBody>
  );
};

export default PresentBody;
