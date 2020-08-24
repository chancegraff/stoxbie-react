import React, {
  useMemo,
} from "react";
import {
  StyledRow,
} from "baseui/dist/table";
import {
  HistoricalTradeFinished,
  HistoricalTradeStarted,
} from "trade-types";

import {
  formatCount,
  formatCurrency,
} from "utils/Utilities";
import ChangeHoldings from "components/HoldingControls/ChangeHoldings";

import {
  RightAlignedCell,
} from "./TradeRow.styled";

type Props = {
  totalShareCount?: number;
  sharePrice?: number;
  handleOrder?: (sharePrice: number, shareCount: number) => void;
  holding: HistoricalTradeStarted | HistoricalTradeFinished;
};

const TradeRow: React.FC<Props> = (
  {
    totalShareCount,
    sharePrice,
    handleOrder,
    holding,
  },
) =>
{
  const safeShares = useMemo(
    () =>
    {
      if (holding.closeCount)
      {
        return formatCount(
          holding.closeCount,
        );
      }
      else if (holding.openCount)
      {
        return formatCount(
          holding.openCount,
        );
      }
    },
    [
      holding,
    ],
  );
  const safeOpen = useMemo(
    () =>
    {
      if (holding.openPrice)
      {
        return formatCurrency(
          holding.openPrice,
        );
      }
    },
    [
      holding,
    ],
  );
  const safeClose = useMemo(
    () =>
    {
      if (holding.closePrice)
      {
        const abbreviatedClose = formatCurrency(
          holding.closePrice,
        );

        return abbreviatedClose;
      }
      else if (
        handleOrder &&
        sharePrice &&
        totalShareCount
      )
      {
        const shareModifier = (holding.openModifier * -1) as -1 | 1;

        return (
          <ChangeHoldings
            handleOrder={handleOrder}
            shareCount={totalShareCount}
            sharePrice={sharePrice}
            shareModifier={shareModifier}
            secondary={true}
            size="small"
          >
            Exit
          </ChangeHoldings>
        );
      }
    },
    [
      totalShareCount,
      sharePrice,
      holding,
      handleOrder,
    ],
  );
  const safeBalance = useMemo(
    () =>
    {
      if (holding.closeCount && holding.closePrice)
      {
        return formatCurrency(
          holding.closeCount * holding.closePrice,
        );
      }
      else if (holding.openCount && holding.openPrice)
      {
        return formatCurrency(
          holding.openCount * holding.openPrice,
        );
      }
    },
    [
      holding,
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
