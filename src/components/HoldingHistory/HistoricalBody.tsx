import React from "react";
import {
  HistoricalTradeFinished,
} from "trade-types";

import {
  StyledTableBody,
} from "./HistoricalBody.styled";
import HistoricalRow from "./HistoricalRow";

type Props = {
  historicalHoldings: HistoricalTradeFinished[];
};

const HistoricalBody: React.FC<Props> = (
  {
    historicalHoldings,
  },
) =>
{
  return (
    <StyledTableBody>
      {
        historicalHoldings.map(
          (
            historicalHolding,
          ) =>
          {
            const {
              openDate,
              closeDate,
            } = historicalHolding;

            return (
              <HistoricalRow
                key={`${openDate}-${closeDate}`}
                historicalHolding={historicalHolding}
              />
            );
          },
        )
      }
    </StyledTableBody>
  );
};

export default HistoricalBody;
