import React, { useMemo } from "react";
import { styled } from "baseui/dist";
import { Block } from "baseui/dist/block";
import { StyledBody, StyledCell, StyledHead, StyledHeadCell, StyledRow, StyledTable } from "baseui/dist/table";
import numbro from "numbro";

import Spinner from "components/BaseUI/Spinner";

type Props = {
  trades?: HistoricalTrade[];
};

const Container = styled(
  Block,
  () => {
    return {
      alignItems: "center",
      display: "flex",
      flex: "1 0",
      flexWrap: "wrap",
      justifyContent: "center",
      width: "100%",
    };
  },
);

const FullTable = styled(
  StyledTable,
  () => {
    return {
      width: "100%",
    };
  },
);

type CellProps = {
  trade: HistoricalTrade;
};

const TradeHistoryCell: React.FC<CellProps> = (
  {
    trade: {
      open,
      close,
      changePercent,
      changeBalance,
      openBalance,
    },
  },
) => {
  const safeOpen = useMemo(
    () => {
      if (open) {
        const abbreviatedOpen = numbro(
          open,
        ).formatCurrency(
          {
            average: true,
            totalLength: 1,
          },
        );

        return abbreviatedOpen;
      }
    },
    [
      open,
    ],
  );
  const safeClose = useMemo(
    () => {
      if (close) {
        const abbreviatedClose = numbro(
          close,
        ).formatCurrency(
          {
            average: true,
            totalLength: 1,
          },
        );

        return abbreviatedClose;
      }
    },
    [
      close,
    ],
  );
  const safeChange = useMemo(
    () => {
      if (changePercent) {
        const abbreviatedChange = numbro(
          changePercent,
        ).format(
          {
            output: "percent",
          },
        );

        return abbreviatedChange;
      }
    },
    [
      changePercent,
    ],
  );
  const safeBalance = useMemo(
    () => {
      const currentBalance = changeBalance || openBalance;
      const abbreviatedBalance = numbro(
        currentBalance,
      ).formatCurrency(
        {
          average: true,
          totalLength: 1,
        },
      );

      return abbreviatedBalance;
    },
    [
      changeBalance,
      openBalance,
    ],
  );

  return (
    <StyledRow>
      <StyledCell>
        {safeOpen}
      </StyledCell>
      <StyledCell>
        {safeClose}
      </StyledCell>
      <StyledCell>
        {safeChange}
      </StyledCell>
      <StyledCell>
        {safeBalance}
      </StyledCell>
    </StyledRow>
  );
};

const TradeHistory: React.FC<Props> = (
  {
    trades,
  },
) => {
  if (!trades?.length) {
    return <Spinner container={Container} />;
  }

  return (
    <Container>
      <FullTable>
        <StyledHead>
          <StyledHeadCell>
            Open
          </StyledHeadCell>
          <StyledHeadCell>
            Close
          </StyledHeadCell>
          <StyledHeadCell>
            ± %
          </StyledHeadCell>
          <StyledHeadCell>
            $
          </StyledHeadCell>
        </StyledHead>
        <StyledBody>
          {trades.map(
            (
              trade,
              index,
            ) => {
              return (
                <TradeHistoryCell
                  key={index}
                  trade={trade}
                />
              );
            },
          )}
        </StyledBody>
      </FullTable>
    </Container>
  );
};

export default TradeHistory;
