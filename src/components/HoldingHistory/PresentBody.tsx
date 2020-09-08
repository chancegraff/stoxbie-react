import React, {
  useMemo,
  useRef,
} from "react";
import {
  HistoricalPrice,
} from "@chancey/iex-cloud";
import {
  List,
} from "immutable";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars
import {
  LedgerType,
  PresentHoldingType,
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
  formatCurrency,
} from "utils/Utilities";

import CloseHoldings from "./CloseHoldings";
import {
  GrommetTableBody,
  GrommetTableCell,
} from "./PresentBody.styled";
import PresentRow from "./PresentRow";
import ToggleCombined from "./ToggleCombined";

type Props = {
  presentHolding: PresentHoldingType | undefined;
  presentLedger: LedgerType | undefined;
  presentPrice: HistoricalPrice | undefined;
  presentHoldings: List<PresentHoldingType>;
  rowHoverState: HoverState;
  combinedBodyState: CombinedBodyState;
  handleClose: (present: PresentHoldingType) => void;
  handleMouseEnterRow: HandleMouseEnter;
  handleMouseLeaveRow: HandleMouseLeave;
  handleToggleCombined: () => void;
};

const PresentBody: React.FC<Props> = (
  {
    presentHolding,
    presentLedger,
    presentPrice,
    presentHoldings,
    rowHoverState,
    combinedBodyState,
    handleClose,
    handleMouseEnterRow,
    handleMouseLeaveRow,
    handleToggleCombined,
  },
) =>
{
  const presentRowRef = useRef<HTMLTableRowElement>();
  const totalEquity = useMemo(
    () =>
    {
      const rawValue = presentHoldings.reduce(
        (
          previousValue,
          holding,
        ) =>
        {
          return previousValue + holding.orders.present.balance;
        },
        0,
      );

      return formatCurrency(
        rawValue,
      );
    },
    [
      presentHoldings,
    ],
  );
  const toggleCombined = useMemo(
    () =>
    {
      if (presentHoldings.count() <= 1)
      {
        return null;
      }

      return (
        <ToggleCombined
          css=""
          rowToTarget={presentRowRef.current}
          rowHoverState={rowHoverState}
          handleToggleCombined={handleToggleCombined}
          combinedBodyState={combinedBodyState}
        />
      );
    },
    [
      presentHoldings,
      rowHoverState,
      handleToggleCombined,
      combinedBodyState,
      presentRowRef,
    ],
  );

  if (
    (
      !presentHolding ||
      !presentLedger ||
      !presentPrice
    )
  )
  {
    return null;
  }

  return (
    <GrommetTableBody
      css=""
      onMouseEnter={handleMouseEnterRow}
      onMouseLeave={handleMouseLeaveRow}
    >
      {toggleCombined}
      <PresentRow
        ref={presentRowRef}
        css=""
        presentHolding={presentHolding}
        presentLedger={presentLedger}
      >
        {
          (
            {
              shares,
              open,
            }: {
              shares: string;
              open: string;
            },
          ) =>
          {
            return (
              <>
                <GrommetTableCell css="">
                  {shares}
                </GrommetTableCell>
                <GrommetTableCell css="">
                  {open}
                </GrommetTableCell>
                <GrommetTableCell css="">
                  <CloseHoldings
                    css=""
                    presentHolding={presentHolding}
                    handleClose={handleClose}
                  />
                </GrommetTableCell>
                <GrommetTableCell css="">
                  {totalEquity}
                </GrommetTableCell>
              </>
            );
          }
        }
      </PresentRow>
    </GrommetTableBody>
  );
};

export default PresentBody;
