import React, {
  PropsHasClass,
  useRef,
} from "react";
import {
  HistoricalPrice,
} from "@chancey/iex-cloud";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars
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

import CloseHoldings from "./CloseHoldings";
import {
  StyledTableBody,
} from "./PresentBody.styled";
import PresentRow from "./PresentRow";
import ToggleCombined from "./ToggleCombined";

type Props = PropsHasClass & {
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
    className,
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

  if (!highestPresentHolding ||
      !presentLedger || !presentPrice)
  {
    return null;
  }

  return (
    <StyledTableBody
      css=""
      className={className}
      onMouseEnter={handleMouseEnterRow}
      onMouseLeave={handleMouseLeaveRow}
    >
      <ToggleCombined
        css=""
        rowToTarget={presentRowRef.current}
        rowHoverState={rowHoverState}
        handleToggleCombined={handleToggleCombined}
        combinedBodyState={combinedBodyState}
      />
      <PresentRow
        ref={presentRowRef}
        css=""
        presentHolding={highestPresentHolding}
        presentLedger={presentLedger}
      >
        <CloseHoldings
          css=""
          presentHolding={highestPresentHolding}
          presentLedger={presentLedger}
          presentPrice={presentPrice}
          handleSubmit={handleSubmit}
        />
      </PresentRow>
    </StyledTableBody>
  );
};

export default PresentBody;
