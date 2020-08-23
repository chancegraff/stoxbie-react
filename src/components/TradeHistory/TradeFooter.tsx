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
  pastTrades: HistoricalTradeFinished[];
  playerLedger: HistoricalLedger;
};

const TradeFooter: React.FC<Props> = (
  {
    pastTrades,
    playerLedger,
  },
) =>
{
  const safeChange = useMemo(
    () =>
    {
      if (pastTrades.length > 0)
      {
        return formatPercentage(
          playerLedger.totalChange,
        );
      }
    },
    [
      playerLedger,
      pastTrades,
    ],
  );
  const safeBalance = useMemo(
    () =>
    {
      return formatCurrency(
        playerLedger.totalBalance,
      );
    },
    [
      playerLedger,
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
