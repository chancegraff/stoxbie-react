import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  HistoricalPrice,
} from "@chancey/iex-cloud";
import {
  List,
} from "immutable";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars
import {
  HistoricalHoldingType,
  LedgerType,
  PresentHoldingType,
} from "trade-types";
import {
  useDebouncedCallback,
} from "use-debounce/lib";

import {
  CombinedBodyState,
  DEBOUNCE_MEDIUM_MS,
} from "utils/Constants";
import {
  useHover,
} from "utils/Hooks";
import Spinner from "components/Grommet/Spinner";

import CombinedBody from "./CombinedBody";
import HistoricalBody from "./HistoricalBody";
import {
  GrommetContainer,
  GrommetTable,
  GrommetTheme,
} from "./HoldingTable.styled";
import PresentBody from "./PresentBody";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";

type Props = {
  presentPrice: HistoricalPrice | undefined;
  presentLedger: LedgerType;
  presentHoldings: List<PresentHoldingType>;
  historicalHoldings: List<HistoricalHoldingType>;
  presentHolding: PresentHoldingType | undefined;
  handleClose: (present: PresentHoldingType) => void;
};

const HoldingTable: React.FC<Props> = (
  {
    presentPrice,
    presentLedger,
    presentHoldings,
    historicalHoldings,
    presentHolding,
    handleClose,
  },
) =>
{
  const [
    rowHoverState,
    handleMouseEnterRow,
    handleMouseLeaveRow,
  ] = useHover();

  const [
    combinedBodyState,
    setCombinedBodyState,
  ] = useState<CombinedBodyState>(
    CombinedBodyState.Retracting,
  );

  const [
    debouncedMouseLeaveRow,
    cancelMouseLeaveRow,
  ] = useDebouncedCallback(
    handleMouseLeaveRow,
    DEBOUNCE_MEDIUM_MS,
  );

  const debouncedMouseEnterRow = useCallback(
    () =>
    {
      cancelMouseLeaveRow();
      handleMouseEnterRow();
    },
    [
      cancelMouseLeaveRow,
      handleMouseEnterRow,
    ],
  );
  const handleExtendCombined = useCallback(
    () =>
    {
      setCombinedBodyState(
        CombinedBodyState.Extending,
      );
    },
    [],
  );
  const handleRetractCombined = useCallback(
    () =>
    {
      setCombinedBodyState(
        CombinedBodyState.Retracting,
      );
    },
    [],
  );
  const handleToggleCombined = useCallback(
    () =>
    {
      if (combinedBodyState === CombinedBodyState.Retracting)
      {
        handleExtendCombined();
      }
      else
      {
        handleRetractCombined();
      }
    },
    [
      combinedBodyState,
      handleExtendCombined,
      handleRetractCombined,
    ],
  );

  useEffect(
    () =>
    {
      if (presentHoldings.count() <= 1)
      {
        handleRetractCombined();
      }
    },
    [
      presentHoldings,
      handleRetractCombined,
    ],
  );

  if (!presentPrice)
  {
    return (
      <Spinner
        css=""
      />
    );
  }

  return (
    <GrommetTheme css="">
      <GrommetContainer
        css=""
        onScroll={handleMouseLeaveRow}
      >
        <GrommetTable css="">
          <TableHeader css="" />
          <PresentBody
            css=""
            presentHolding={presentHolding}
            presentPrice={presentPrice}
            presentLedger={presentLedger}
            presentHoldings={presentHoldings}
            rowHoverState={rowHoverState}
            combinedBodyState={combinedBodyState}
            handleClose={handleClose}
            handleToggleCombined={handleToggleCombined}
            handleMouseEnterRow={debouncedMouseEnterRow}
            handleMouseLeaveRow={debouncedMouseLeaveRow}
          />
          <CombinedBody
            css=""
            combinedBodyState={combinedBodyState}
            presentHoldings={presentHoldings}
            presentLedger={presentLedger}
            presentPrice={presentPrice}
            handleClose={handleClose}
          />
          <HistoricalBody
            css=""
            historicalHoldings={historicalHoldings}
          />
          <TableFooter
            css=""
            presentLedger={presentLedger}
          />
        </GrommetTable>
      </GrommetContainer>
    </GrommetTheme>
  );
};

export default HoldingTable;
