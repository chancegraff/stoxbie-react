import React from "react";
import {
  HistoricalPrice,
} from "@chancey/iex-cloud";
import {
  HistoricalLedger,
  HistoricalTradeStarted,
} from "trade-types";

import {
  CombinedBodyState,
} from "utils/Constants";

import CloseHoldings from "./CloseHoldings";
import {
  StyledTableBody,
  StyledTableCell,
} from "./CombinedBody.styled";
import PresentRow from "./PresentRow";

type Props = {
  combinedBodyState: CombinedBodyState;
  presentHoldings: HistoricalTradeStarted[];
  presentLedger: HistoricalLedger | undefined;
  presentPrice: HistoricalPrice | undefined;
  handleSubmit: (sharePrice: number, shareCount: number) => void;
};

const CombinedBody: React.FC<Props> = (
  {
    combinedBodyState,
    presentHoldings,
    presentLedger,
    presentPrice,
    handleSubmit,
  },
) =>
{
  if (
    combinedBodyState === CombinedBodyState.Retracting ||
    !presentLedger ||
    !presentPrice
  )
  {
    return null;
  }

  return (
    <StyledTableBody>
      {
        presentHoldings.map(
          (
            presentHolding,
          ) =>
          {
            const {
              openDate,
              openCount,
            } = presentHolding;

            return (
              <PresentRow
                key={`${openDate}-${openCount}`}
                presentHolding={presentHolding}
                TableCell={StyledTableCell}
              >
                <CloseHoldings
                  presentHolding={presentHolding}
                  presentLedger={presentLedger}
                  presentPrice={presentPrice}
                  handleSubmit={handleSubmit}
                />
              </PresentRow>
            );
          },
        )
      }
    </StyledTableBody>
  );
};

export default CombinedBody;
