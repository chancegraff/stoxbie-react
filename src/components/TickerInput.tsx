import React, {
  useCallback, useState,
} from "react";
import { useHistory } from "react-router-dom";
import { Block } from "baseui/dist/block";
import { Override } from "baseui/dist/overrides";
import {
  OnChangeParams,
  Option,
  Select,
  SelectOverrides,
  SIZE,
  TYPE,
  Value,
} from "baseui/dist/select";
import {
  Caption2, Label2,
} from "baseui/dist/typography";
import { Search } from "iex-cloud";

type Props = {
  handleSearch: (
    nextValue: string,
    setOptions: React.Dispatch<React.SetStateAction<Search[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
};

const Dropdown: Override<unknown> = {
  style: {
    boxShadow: "none",
    padding: "0",
  },
};

const overrides: SelectOverrides = { Dropdown };

const handleFilter = (options: Value) =>
{
  return options;
};
const handleLabel = (args: { option?: Option }) =>
{
  return (
    <Block
      alignItems="baseline"
      display="flex"
    >
      <Label2>
        {args.option?.symbol}
      </Label2>
      <Caption2 marginLeft="6px">
        {args.option?.securityName}
      </Caption2>
    </Block>
  );
};

const TickerInput: React.FC<Props> = ({ handleSearch }) =>
{
  const history = useHistory();
  const [
    options,
    setOptions,
  ] = useState<Search[]>([]);
  const [
    isLoading,
    setIsLoading,
  ] = useState<boolean>(false);

  const handleInputChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) =>
    {
      const nextValue = event.currentTarget.value;

      if (nextValue)
      {
        setIsLoading(true);
        handleSearch(
          nextValue,
          setOptions,
          setIsLoading,
        );
      }
      else
      {
        setOptions([]);
      }
    },
    [ handleSearch ],
  );
  const handleChange = useCallback(
    (params: OnChangeParams) =>
    {
      const [ value ] = params.value;

      history.push(`/stock/${value.symbol}`);
    },
    [ history ],
  );

  return (
    <Select
      autoFocus={true}
      clearable={false}
      filterOptions={handleFilter}
      getOptionLabel={handleLabel}
      getValueLabel={handleLabel}
      isLoading={isLoading}
      labelKey="symbol"
      onChange={handleChange}
      onInputChange={handleInputChange}
      options={options}
      overrides={overrides}
      placeholder="Search for company by name or ticker..."
      size={SIZE.large}
      type={TYPE.search}
      valueKey="symbol"
    />
  );
};

export default TickerInput;
