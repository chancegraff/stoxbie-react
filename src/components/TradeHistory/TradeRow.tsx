import React, {
  useMemo,
} from "react";
import {
  StyledRow,
} from "baseui/dist/table";

import {
  formatCount,
  formatCurrency,
} from "utils/Utilities";
import TradeAction from "components/TradeControl/TradeAction";

import {
  RightAlignedCell,
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
  const safeShares = useMemo(
    () =>
    {
      if (trade.closeCount)
      {
        return formatCount(
          trade.closeCount,
        );
      }
      else if (trade.openCount)
      {
        return formatCount(
          trade.openCount,
        );
      }
    },
    [
      trade,
    ],
  );
  const safeOpen = useMemo(
    () =>
    {
      if (trade.openPrice)
      {
        return formatCurrency(
          trade.openPrice,
        );
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
        const shareModifier = (trade.openModifier * -1) as -1 | 1;

        return (
          <TradeAction
            handleTrade={handleTrade}
            shareCount={totalShareCount}
            sharePrice={sharePrice}
            shareModifier={shareModifier}
            secondary={true}
            size="small"
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
  const safeBalance = useMemo(
    () =>
    {
      if (trade.closeCount && trade.closePrice)
      {
        return formatCurrency(
          trade.closeCount * trade.closePrice,
        );
      }
      else if (trade.openCount && trade.openPrice)
      {
        return formatCurrency(
          trade.openCount * trade.openPrice,
        );
      }
    },
    [
      trade,
    ],
  );

  return (
    <StyledRow>
      <RightAlignedCell>
        {safeShares}
      </RightAlignedCell>
      <RightAlignedCell>
        {safeOpen}
      </RightAlignedCell>
      <RightAlignedCell>
        {safeClose}
      </RightAlignedCell>
      <RightAlignedCell>
        {safeBalance}
      </RightAlignedCell>
    </StyledRow>
  );
};

export default TradeRow;
