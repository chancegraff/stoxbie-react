import React, {
  useMemo,
} from "react";
import {
  HistoricalLedger,
  HistoricalTradeFinished,
} from "trade-types";

import {
  formatCurrency,
  formatPercentage,
} from "utils/Utilities";

import {
  StyledCell,
  StyledFooterRow,
} from "./TradeHistory.styled";

type Props = {
  historicalHoldings: HistoricalTradeFinished[];
  presentLedger: HistoricalLedger;
};

const TradeFooter: React.FC<Props> = (
  {
    historicalHoldings,
    presentLedger,
  },
) =>
{
  const safeChange = useMemo(
    () =>
    {
      if (historicalHoldings.length > 0)
      {
        return formatPercentage(
          presentLedger.totalChange,
        );
      }
    },
    [
      presentLedger,
      historicalHoldings,
    ],
  );
  const safeBalance = useMemo(
    () =>
    {
      return formatCurrency(
        presentLedger.totalBalance,
      );
    },
    [
      presentLedger,
    ],
  );

  return (
    <StyledFooterRow role="footerRow">
      <StyledCell></StyledCell>
      <StyledCell></StyledCell>
      <StyledCell>
        {safeChange}
      </StyledCell>
      <StyledCell>
        {safeBalance}
      </StyledCell>
    </StyledFooterRow>
  );
};

export default TradeFooter;
