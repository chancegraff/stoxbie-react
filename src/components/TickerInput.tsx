import React, {
  useState,
  useCallback,
} from "react";
import { useHistory } from "react-router-dom";
import { Search } from "iex-cloud";
import { Block } from "baseui/dist/block";
import {
  Caption2,
  Label2,
} from "baseui/dist/typography";
import {
  Select,
  SIZE,
  TYPE,
  OnChangeParams,
  Value,
  Option,
  SelectOverrides,
} from "baseui/dist/select";
import { Override } from "baseui/dist/overrides";

type Props = {
  handleSearch: (
    nextValue: string,
    setOptions: React.Dispatch<
      React.SetStateAction<
        Search[]
      >
    >,
    setLoading: React.Dispatch<
      React.SetStateAction<
        boolean
      >
    >
  ) => void;
};

const Dropdown: Override<unknown> = {
  style: {
    padding:
      "0",
    boxShadow:
      "none",
  },
};

const overrides: SelectOverrides = {
  Dropdown,
};

const handleFilter = (
  options: Value
) =>
  options;
const handleLabel = (args: {
  option?: Option;
}) => (
  <Block
    display="flex"
    alignItems="baseline"
  >
    <Label2>
      {
        args
          .option
          ?.symbol
      }
    </Label2>
    <Caption2 marginLeft="6px">
      {
        args
          .option
          ?.securityName
      }
    </Caption2>
  </Block>
);

const TickerInput: React.FC<Props> = ({
  handleSearch,
}) => {
  const history = useHistory();
  const [
    options,
    setOptions,
  ] = useState<
    Search[]
  >([]);
  const [
    isLoading,
    setIsLoading,
  ] = useState<
    boolean
  >(
    false
  );

  const handleInputChange = useCallback(
    (
      event: React.FormEvent<
        HTMLInputElement
      >
    ) => {
      const nextValue =
        event
          .currentTarget
          .value;
      if (
        nextValue
      ) {
        setIsLoading(
          true
        );
        handleSearch(
          nextValue,
          setOptions,
          setIsLoading
        );
      } else {
        setOptions(
          []
        );
      }
    },
    [
      handleSearch,
    ]
  );
  const handleChange = useCallback(
    (
      params: OnChangeParams
    ) => {
      const [
        value,
      ] = params.value;
      history.push(
        `/stock/${value.symbol}`
      );
    },
    [
      history,
    ]
  );

  return (
    <Select
      isLoading={
        isLoading
      }
      overrides={
        overrides
      }
      options={
        options
      }
      labelKey="symbol"
      valueKey="symbol"
      size={
        SIZE.large
      }
      type={
        TYPE.search
      }
      onChange={
        handleChange
      }
      onInputChange={
        handleInputChange
      }
      filterOptions={
        handleFilter
      }
      getOptionLabel={
        handleLabel
      }
      getValueLabel={
        handleLabel
      }
      autoFocus={
        true
      }
      clearable={
        false
      }
      placeholder="Search for company by name or ticker..."
    />
  );
};

export default TickerInput;
