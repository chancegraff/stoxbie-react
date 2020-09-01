import React, {
  PropsHasClass,
} from "react";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars
import {
  HistoricalTradeFinished,
} from "trade-types";

import {
  GrommetTableBody,
} from "./HistoricalBody.styled";
import HistoricalRow from "./HistoricalRow";

type Props = PropsHasClass & {
  historicalHoldings: HistoricalTradeFinished[];
};

const HistoricalBody: React.FC<Props> = (
  {
    className,
    historicalHoldings,
  },
) =>
{
  return (
    <GrommetTableBody
      className={className}
      css=""
    >
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
