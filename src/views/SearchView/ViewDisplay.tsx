import React from "react";
import {
  RouteProps,
} from "react-router-dom";
import {
  Search,
} from "@chancey/iex-cloud";
import {
  AsyncStates,
} from "async-types";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import PageContent from "components/PageTemplates/PageContent";
import SearchInput from "components/StockSearch/SearchInput";

import {
  GrommetHeading,
  GrommetText,
} from "./ViewStyles";

type Props = RouteProps & {
  handleSearch: (nextValue: string) => void;
  searchState: AsyncStates;
  searchResults: Search[];
};

const ViewDisplay: React.FC<Props> = (
  {
    handleSearch,
    searchState,
    searchResults,
  },
) =>
{
  return (
    <PageContent css="">
      <GrommetHeading css="" />
      <GrommetText css="" />
      <SearchInput
        css=""
        handleSearch={handleSearch}
        searchState={searchState}
        searchResults={searchResults}
      />
    </PageContent>
  );
};

export default ViewDisplay;
