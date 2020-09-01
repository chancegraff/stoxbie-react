import React, {
  PropsHasClass,
} from "react";
import {
  Search,
} from "@chancey/iex-cloud";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  GrommetBottomText,
  GrommetContainer,
  GrommetTopText,
} from "./SearchResult.styled";

type Props = PropsHasClass & {
  searchResult: Search;
  focus?: boolean;
  hover?: boolean;
};

const StockSymbol: React.FC<Props> = (
  {
    className,
    searchResult,
  },
) =>
{
  return (
    <GrommetContainer
      className={className}
      css=""
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
