import React, { useMemo } from "react";
import { styled } from "baseui/dist";
import {
  Button, SIZE,
} from "baseui/dist/button";
import {
  StyledCell,
  StyledRow,
} from "baseui/dist/table";
import numbro from "numbro";

import TradeAction from "./TradeAction";

type Props = {
  trade: HistoricalTradeStarted | HistoricalTradeFinished;
  sharePrice?: number;
  handleTrade?: (sharePrice: number, shareCount: number) => void;
};

const SmallButton = styled(
  (props) =>
  {
    return (
      <Button
        {...props}
        size={SIZE.mini}
      />
    );
  },
  ({ $theme }) =>
  {
    return {
      ...$theme.typography.font100, height: "20px",
    };
  },
);

const RightAlignedCell = styled(
  StyledCell,
  {
    display: "flex",
    justifyContent: "flex-end",
  },
);

const TradeRow: React.FC<Props> = ({
  sharePrice,
  handleTrade,
  trade: {
    openPrice,
    openCount,
    closePrice,
    closeCount,
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
        return (
          <TradeAction
            Component={SmallButton}
            handleTrade={handleTrade}
            purchaseAmount={openCount}
            purchaseModifier={-1}
            sharePrice={sharePrice}
          >
              Sell
          </TradeAction>
        );
      }
    },
    [
      openCount,
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
