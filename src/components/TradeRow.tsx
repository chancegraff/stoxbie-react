import React, { useMemo } from "react";
import { StyledRow } from "baseui/dist/table";
import numbro from "numbro";

import TradeAction from "./TradeAction";
import {
  RightAlignedCell,
  SmallButton,
} from "./TradeRow.styled";

type Props = {
  trade: HistoricalTradeStarted | HistoricalTradeFinished;
  sharePrice?: number;
  handleTrade?: (sharePrice: number, shareCount: number) => void;
};

const TradeRow: React.FC<Props> = ({
  sharePrice,
  handleTrade,
  trade: {
    openPrice,
    openCount,
    openModifier,
    closePrice,
    changePercent,
    changeBalance,
  },
}) =>
{
  const safeOpen = useMemo(
    () =>
    {
      if (openPrice)
      {
        const abbreviatedOpen = numbro(openPrice).formatCurrency({
          average: true,
          totalLength: 1,
        });

        return abbreviatedOpen;
      }
    },
    [ openPrice ],
  );
  const safeClose = useMemo(
    () =>
    {
      if (closePrice)
      {
        const abbreviatedClose = numbro(closePrice).formatCurrency({
          average: true,
          totalLength: 1,
        });

        return abbreviatedClose;
      }

      if (handleTrade && sharePrice)
      {
        const closeModifier = (openModifier * -1) as -1 | 1;

        return (
          <TradeAction
            Component={SmallButton}
            handleTrade={handleTrade}
            purchaseAmount={openCount}
            purchaseModifier={closeModifier}
            sharePrice={sharePrice}
          >
              Exit
          </TradeAction>
        );
      }
    },
    [
      openCount,
      openModifier,
      closePrice,
      sharePrice,
      handleTrade,
    ],
  );
  const safeChange = useMemo(
    () =>
    {
      if (changePercent)
      {
        const abbreviatedChange = numbro(changePercent).format({
          average: true,
          output: "percent",
        });

        return abbreviatedChange;
      }
    },
    [ changePercent ],
  );
  const safeBalance = useMemo(
    () =>
    {
      if (changeBalance)
      {
        const abbreviatedBalance = numbro(changeBalance).formatCurrency({
          average: true,
          totalLength: 1,
        });

        return abbreviatedBalance;
      }
    },
    [ changeBalance ],
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
