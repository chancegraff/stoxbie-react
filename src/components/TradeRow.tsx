import React, {
  useMemo,
} from "react";
import {
  StyledRow,
} from "baseui/dist/table";

import {
  formatCurrency,
  formatPercentage,
} from "utils/Utilities";
import TradeAction from "components/TradeAction";

import {
  RightAlignedCell,
  SmallButton,
} from "./TradeRow.styled";

type Props = {
  totalShareCount?: number;
  sharePrice?: number;
  handleTrade?: (sharePrice: number, shareCount: number) => void;
  trade: HistoricalTradeStarted | HistoricalTradeFinished;
};

const TradeRow: React.FC<Props> = (
  {
    totalShareCount,
    sharePrice,
    handleTrade,
    trade,
  },
) =>
{
  const safeOpen = useMemo(
    () =>
    {
      if (trade.openPrice)
      {
        const abbreviatedOpen = formatCurrency(
          trade.openPrice,
        );

        return abbreviatedOpen;
      }
    },
    [
      trade,
    ],
  );
  const safeClose = useMemo(
    () =>
    {
      if (trade.closePrice)
      {
        const abbreviatedClose = formatCurrency(
          trade.closePrice,
        );

        return abbreviatedClose;
      }
      else if (
        handleTrade &&
        sharePrice &&
        totalShareCount
      )
      {
        const closeModifier = (trade.openModifier * -1) as -1 | 1;

        return (
          <TradeAction
            Component={SmallButton}
            handleTrade={handleTrade}
            shareCount={totalShareCount}
            sharePrice={sharePrice}
            actionModifier={closeModifier}
          >
              Exit
          </TradeAction>
        );
      }
    },
    [
      totalShareCount,
      sharePrice,
      trade,
      handleTrade,
    ],
  );
  const safeChange = useMemo(
    () =>
    {
      if (trade.changePercent)
      {
        const abbreviatedChange = formatPercentage(
          trade.changePercent,
        );

        return abbreviatedChange;
      }
    },
    [
      trade,
    ],
  );
  const safeBalance = useMemo(
    () =>
    {
      if (trade.changeBalance)
      {
        const abbreviatedBalance = formatCurrency(
          trade.changeBalance,
        );

        return abbreviatedBalance;
      }
    },
    [
      trade,
    ],
  );

  return (
    <StyledRow>
      <RightAlignedCell>
        {safeOpen}
      </RightAlignedCell>
      <RightAlignedCell>
        {safeClose}
      </RightAlignedCell>
      <RightAlignedCell>
        {safeChange}
      </RightAlignedCell>
      <RightAlignedCell>
        {safeBalance}
      </RightAlignedCell>
    </StyledRow>
  );
};

export default TradeRow;
