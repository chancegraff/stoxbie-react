import React, {
  useCallback,
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
  SelectEvent,
} from "grommet";
import {
  Search,
} from "iex-cloud";

import {
  StyledTextInput,
} from "./StockInput.styled";
import StockSymbol from "./StockSymbol";

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

  const suggestions = useMemo(
    () =>
    {
      return searchResults.map(
        (
          searchResult,
        ) =>
        {
          return {
            label: <StockSymbol searchResult={searchResult} />,
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

  return (
    <StyledTextInput
      value={value}
      suggestions={suggestions}
      onChange={handleChange}
      onSelect={handleSelect}
    />
  );
};

export default StockInput;
