import React from "react";
import { styled } from "baseui/dist";
import { Block } from "baseui/dist/block";
import { StyledBody, StyledCell, StyledHead, StyledHeadCell, StyledRow, StyledTable } from "baseui/dist/table";

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
                <StyledRow key={index}>
                  <StyledCell>
                    {trade.open}
                  </StyledCell>
                  <StyledCell>
                    {trade.close}
                  </StyledCell>
                  <StyledCell>
                    {trade.changePercent}
                  </StyledCell>
                  <StyledCell>
                    {trade.changeBalance || trade.openBalance}
                  </StyledCell>
                </StyledRow>
              );
            },
          )}
        </StyledBody>
      </FullTable>
    </Container>
  );
};

export default TradeHistory;
