import React, {
  useMemo,
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
} from "utils/hooks/useHover";
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
  highestPresentHolding: HistoricalTradeStarted | undefined;
  presentLedger: HistoricalLedger | undefined;
  presentPrice: HistoricalPrice | undefined;
  presentHoldings: HistoricalTradeStarted[];
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
    presentHoldings,
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
  const totalEquity = useMemo(
    () =>
    {
      const rawValue = presentHoldings.reduce(
        (
          previousValue,
          holding,
        ) =>
        {
          return previousValue + holding.openBalance;
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
      if (presentHoldings.length <= 1)
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
      !highestPresentHolding ||
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
        presentHolding={highestPresentHolding}
        presentLedger={presentLedger}
      >
        {
          (
            {
              shares,
              open,
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
                    presentHolding={highestPresentHolding}
                    presentLedger={presentLedger}
                    presentPrice={presentPrice}
                    handleSubmit={handleSubmit}
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
