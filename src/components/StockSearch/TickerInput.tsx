import React, {
  useCallback, useState,
} from "react";
import {
  useHistory,
} from "react-router-dom";
import {
  OnChangeParams,
  Select,
  SIZE,
  TYPE,
  Value,
} from "baseui/dist/select";
import {
  Search,
} from "iex-cloud";

import {
  TICKER_INPUT_PLACERHOLDER,
} from "utils/Constants";

import Label from "./TickerInput.label";
import {
  Dropdown,
} from "./TickerInput.overrides";

type Props = {
  handleSearch: (
    nextValue: string,
    setOptions: React.Dispatch<React.SetStateAction<Search[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
};

const filterOptions = (
  options: Value,
) =>
{
  return options;
};

const overrides = {
  Dropdown,
};

// TODO Remove use of BaseUI
const TickerInput: React.FC<Props> = (
  {
    handleSearch,
  },
) =>
{
  const history = useHistory();
  const [
    options,
    setOptions,
  ] = useState<Search[]>(
    [],
  );
  const [
    isLoading,
    setIsLoading,
  ] = useState<boolean>(
    false,
  );
  const handleInputChange = useCallback(
    (
      event: React.FormEvent<HTMLInputElement>,
    ) =>
    {
      const nextValue = event.currentTarget.value;

      if (nextValue)
      {
        setIsLoading(
          true,
        );
        handleSearch(
          nextValue,
          setOptions,
          setIsLoading,
        );
      }
      else
      {
        setOptions(
          [],
        );
      }
    },
    [
      handleSearch,
    ],
  );
  const handleChange = useCallback(
    (
      params: OnChangeParams,
    ) =>
    {
      const [
        value,
      ] = params.value;

      history.push(
        `/stock/${value.symbol as string}`,
      );
    },
    [
      history,
    ],
  );

  return (
    <Select
      autoFocus={true}
      valueKey="symbol"
      filterOptions={filterOptions}
      getOptionLabel={Label}
      getValueLabel={Label}
      isLoading={isLoading}
      labelKey="symbol"
      clearable={false}
      type={TYPE.search}
      options={options}
      overrides={overrides}
      placeholder={TICKER_INPUT_PLACERHOLDER}
      size={SIZE.large}
      onInputChange={handleInputChange}
      onChange={handleChange}
    />
  );
};

export default TickerInput;
