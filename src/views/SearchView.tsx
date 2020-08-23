import React, {
  useCallback,
  useState,
} from "react";
import {
  AsyncStates,
} from "async-types";
import {
  Box,
  Heading,
  Text,
} from "grommet";
import {
  Search,
} from "iex-cloud";
import {
  useDebouncedCallback,
} from "use-debounce";

import {
  DEBOUNCE_INPUT_MS,
} from "utils/Constants";
import PageContent from "templates/PageContent";
import StockInput from "components/StockSearch/StockInput";

type Props = {
  handleSearch: (nextValue: string) => Promise<Search[]>;
};

const SearchView: React.FC<Props> = (
  {
    handleSearch,
  },
) =>
{
  const [
    searchResults,
    setSearchResults,
  ] = useState<Search[]>(
    [],
  );
  const [
    searchState,
    setSearchState,
  ] = useState<AsyncStates>(
    "idling",
  );

  const [
    handleSearchLazily,
  ] = useDebouncedCallback(
    useCallback(
      async (
        nextValue: string,
      ) =>
      {
        setSearchState(
          "loading",
        );

        const options = await handleSearch(
          nextValue,
        );

        setSearchResults(
          options,
        );
        setSearchState(
          "idling",
        );
      },
      [
        handleSearch,
      ],
    ),
    DEBOUNCE_INPUT_MS,
  );

  return (
    <PageContent>
      <Heading
        level="1"
        size="large"
        margin={
          {
            vertical: "large",
          }
        }
      >
        Ticker Search
      </Heading>
      <Text
        size="medium"
        color="text-xweak"
        margin={
          {
            top: "none",
            bottom: "xsmall",
          }
        }
      >
        Select the stock ticker to trade.
      </Text>
      <Box>
        <StockInput
          handleSearch={handleSearchLazily}
          searchState={searchState}
          searchResults={searchResults}
        />
      </Box>
    </PageContent>
  );
};

export default SearchView;
