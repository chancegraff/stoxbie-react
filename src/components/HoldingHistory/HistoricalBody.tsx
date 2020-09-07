import React from "react";
import {
  ClosedHolding,
} from "holding-types";
import {
  List,
} from "immutable";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  GrommetTableBody,
} from "./HistoricalBody.styled";
import HistoricalRow from "./HistoricalRow";

type Props = {
  historicalHoldings: List<ClosedHolding>;
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
              open,
              close,
            } = historicalHolding;

            return (
              <HistoricalRow
                key={`${open.date}:${open.amount}-${close.date}:${close.amount}`}
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
