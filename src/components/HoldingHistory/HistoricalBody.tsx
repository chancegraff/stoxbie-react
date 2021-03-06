import React from "react";
import {
  List,
} from "immutable";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars
import {
  HistoricalHoldingType,
} from "trade-types";

import {
  GrommetTableBody,
} from "./HistoricalBody.styled";
import HistoricalRow from "./HistoricalRow";

type Props = {
  historicalHoldings: List<HistoricalHoldingType>;
};

const HistoricalBody: React.FC<Props> = (
  {
    historicalHoldings,
  },
) =>
{
  return (
    <GrommetTableBody
      css=""
      data-testid="historicalBody"
    >
      {
        historicalHoldings.map(
          (
            historicalHolding,
          ) =>
          {
            const {
              orders: {
                present,
                historical,
              },
            } = historicalHolding;

            return (
              <HistoricalRow
                key={`${present.date}:${present.amount}-${historical.date}:${historical.amount}`}
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
