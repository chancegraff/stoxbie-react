import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Search } from "iex-cloud";
import { Override } from "baseui/overrides";
import { Select, SIZE, TYPE, OnChangeParams } from "baseui/select";

type Props = {
  handleSearch: (
    nextValue: string,
    setOptions: React.Dispatch<React.SetStateAction<Search[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
};

const Input: Override<unknown> = {
  props: {
    autoFocus: true,
  },
};

const overrides = {
  Input,
};

const TickerInput: React.FC<Props> = ({ handleSearch }) => {
  const history = useHistory();
  const [options, setOptions] = useState<Search[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const nextValue = event.currentTarget.value;
      if (nextValue) {
        setIsLoading(true);
        handleSearch(nextValue, setOptions, setIsLoading);
      } else {
        setOptions([]);
      }
    },
    [handleSearch]
  );
  const handleChange = useCallback(
    (params: OnChangeParams) => {
      const [value] = params.value;
      history.push(`/ticker/${value.symbol}`);
    },
    [history]
  );

  return (
    <Select
      isLoading={isLoading}
      options={options}
      labelKey="symbol"
      valueKey="symbol"
      size={SIZE.large}
      type={TYPE.search}
      onChange={handleChange}
      onInputChange={handleInputChange}
      overrides={overrides}
      clearable={false}
      placeholder="Search for ticker..."
    />
  );
};

export default TickerInput;
