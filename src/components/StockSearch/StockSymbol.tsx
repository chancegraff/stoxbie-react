import React from "react";
import {
  Search,
} from "iex-cloud";

import {
  StyledBottomText,
  StyledContainer,
  StyledTopText,
} from "./StockSymbol.styled";

type Props = {
  searchResult: Search;
  focus?: boolean;
  hover?: boolean;
};

const StockSymbol: React.FC<Props> = (
  {
    searchResult,
  },
) =>
{
  return (
    <StyledContainer>
      <StyledTopText>
        {searchResult.symbol}
      </StyledTopText>
      <StyledBottomText>
        {searchResult.securityName}
      </StyledBottomText>
    </StyledContainer>
  );
};

export default StockSymbol;
