import React from "react";
import {
  Search,
} from "@chancey/iex-cloud";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  GrommetBottomText,
  GrommetContainer,
  GrommetTopText,
} from "./SearchResult.styled";

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
    <GrommetContainer
      css=""
      data-testid="searchResult"
    >
      <GrommetTopText css="">
        {searchResult.symbol}
      </GrommetTopText>
      <GrommetBottomText css="">
        {searchResult.securityName}
      </GrommetBottomText>
    </GrommetContainer>
  );
};

export default StockSymbol;
