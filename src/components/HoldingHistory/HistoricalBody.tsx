import React from "react";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars
import {
  HistoricalTradeFinished,
} from "trade-types";

import {
  GrommetTableBody,
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
    <GrommetTableBody css="">
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
                css=""
                historicalHolding={historicalHolding}
              />
            );
          },
        )
      }
    </GrommetTableBody>
  );
};

export default HistoricalBody;
