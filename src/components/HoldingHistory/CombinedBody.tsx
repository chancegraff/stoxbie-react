import React from "react";
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
  StyledTableBody,
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
  const [
    presentHolding,
  ] = presentHoldings;

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
      <PresentRow
        presentLedger={presentLedger}
        presentPrice={presentPrice}
        presentHolding={presentHolding}
        handleSubmit={handleSubmit}
      />
    </StyledTableBody>
  );
};

export default CombinedBody;
