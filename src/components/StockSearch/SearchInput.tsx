import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  useHistory,
} from "react-router-dom";
import {
  AsyncStates,
} from "async-types";
import {
  DropStates,
  SelectEvent,
} from "grommet";
import {
  Search,
} from "iex-cloud";

import {
  handleUnloadCreator,
} from "utils/Utilities";

import {
  StyledContainer,
  StyledTextInput,
  StyledTheme,
} from "./SearchInput.styled";
import SearchResult from "./SearchResult";

type Props = {
  handleSearch: (nextValue: string) => void;
  searchState: AsyncStates;
  searchResults: Search[];
};

const StockInput: React.FC<Props> = (
  {
    handleSearch,
    searchState,
    searchResults,
  },
) =>
{
  const history = useHistory();

  const [
    value,
    setValue,
  ] = useState(
    "",
  );
  const [
    dropState,
    setDropState,
  ] = useState<DropStates>(
    "closed",
  );

  const suggestions = useMemo(
    () =>
    {
      return searchResults.map(
        (
          searchResult,
        ) =>
        {
          return {
            label: <SearchResult searchResult={searchResult} />,
            value: searchResult,
          };
        },
      );
    },
    [
      searchResults,
    ],
  );

  const handleChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
    ) =>
    {
      const {
        target: {
          value: nextValue,
        },
      } = event;

      setValue(
        nextValue,
      );

      if (nextValue)
      {
        handleSearch(
          nextValue,
        );
      }
    },
    [
      handleSearch,
    ],
  );
  const handleSelect = useCallback(
    (
      event: SelectEvent<Search>,
    ) =>
    {
      const {
        suggestion: {
          value: nextValue,
        },
      } = event;

      if (nextValue)
      {
        history.push(
          `/stock/${nextValue.symbol}`,
        );
      }
    },
    [
      history,
    ],
  );
  const handleDropOpen = useCallback(
    () =>
    {
      setDropState(
        "opened",
      );
    },
    [],
  );
  const handleDropClose = useCallback(
    () =>
    {
      setDropState(
        "closed",
      );
    },
    [],
  );

  useEffect(
    () =>
    {
      return handleUnloadCreator(
        [
          setValue,
          setDropState,
        ],
      );
    },
    [],
  );

  return (
    <StyledTheme>
      <StyledContainer dropState={dropState}>
        <StyledTextInput
          value={value}
          suggestions={suggestions}
          onChange={handleChange}
          onSelect={handleSelect}
          onSuggestionsOpen={handleDropOpen}
          onSuggestionsClose={handleDropClose}
        />
      </StyledContainer>
    </StyledTheme>
  );
};

export default StockInput;
