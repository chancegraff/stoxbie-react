import React, {
  PropsHasChildren,
} from "react";
import {
  HistoricalTradeStarted,
} from "trade-types";

import {
  StyledTableBody,
} from "./PresentBody.styled";
import PresentRow from "./PresentRow";

type Props = PropsHasChildren & {
  summarizedHoldings: HistoricalTradeStarted | undefined;
};

const PresentBody: React.FC<Props> = (
  {
    children,
    summarizedHoldings,
  },
) =>
{
  if (!summarizedHoldings)
  {
    return null;
  }

  return (
    <StyledTableBody>
      <PresentRow summarizedHoldings={summarizedHoldings}>
        {children}
      </PresentRow>
    </StyledTableBody>
  );
};

export default PresentBody;
