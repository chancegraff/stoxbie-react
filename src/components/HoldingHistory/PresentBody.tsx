import React, {
  PropsHasChildren,
} from "react";
import {
  HistoricalTradeStarted,
} from "trade-types";

import {
  HandleMouseEnter,
  HoverState,
} from "utils/Hooks";

import {
  StyledTableBody,
} from "./PresentBody.styled";
import PresentRow from "./PresentRow";

type Props = PropsHasChildren & {
  summarizedHoldings: HistoricalTradeStarted | undefined;
  hoverState: HoverState;
  handleMouseEnter: HandleMouseEnter;
};

const PresentBody: React.FC<Props> = (
  {
    children,
    summarizedHoldings,
    hoverState,
    handleMouseEnter,
  },
) =>
{
  if (!summarizedHoldings)
  {
    return null;
  }

  return (
    <StyledTableBody onMouseEnter={handleMouseEnter}>
      <PresentRow
        summarizedHoldings={summarizedHoldings}
        hoverState={hoverState}
      >
        {children}
      </PresentRow>
    </StyledTableBody>
  );
};

export default PresentBody;
