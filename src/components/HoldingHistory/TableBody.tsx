import React, {
  useMemo,
} from "react";
import {
  HistoricalTradeFinished,
} from "trade-types";

import HistoricalRow from "./HistoricalRow";
import PresentRow from "./PresentRow";
import {
  StyledTableBody,
} from "./TableBody.styled";

type Props = {
  historicalHoldings: HistoricalTradeFinished[];
};

const TableBody: React.FC<Props> = (
  {
    historicalHoldings,
  },
) =>
{
  const historicalRows = useMemo(
    () =>
    {
      return historicalHoldings.map(
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
      );
    },
    [
      historicalHoldings,
    ],
  );

  return (
    <StyledTableBody>
      <PresentRow />
      {historicalRows}
    </StyledTableBody>
  );
};

export default TableBody;
