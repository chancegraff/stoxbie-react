import React from "react";
import {
  StyledHead,
} from "baseui/dist/table";

import {
  StyledHeadCell,
} from "./TradeHistory.styled";

type Props = {
};

const TradeHeader: React.FC<Props> = () =>
{
  return (
    <StyledHead role="headerRow">
      <StyledHeadCell>
        Shares
      </StyledHeadCell>
      <StyledHeadCell>
        Open
      </StyledHeadCell>
      <StyledHeadCell>
        Close
      </StyledHeadCell>
      <StyledHeadCell>
        Equity
      </StyledHeadCell>
    </StyledHead>
  );
};

export default TradeHeader;
