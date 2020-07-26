import React, { useState, useCallback } from "react";
import { Combobox, SIZE } from "baseui/combobox";
import { Search } from "iex-cloud";
import { Override } from "baseui/overrides";

type Props = {
  handleSearch: (
    nextValue: string,
    setOptions: React.Dispatch<React.SetStateAction<Search[]>>
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

const mapOptions = (option: Search) => option.symbol;

const TickerInput: React.FC<Props> = ({ handleSearch }) => {
  const [value, setValue] = useState<string>("");
  const [options, setOptions] = useState<Search[]>([]);

  const handleChange = useCallback(
    (nextValue: string) => {
      setValue(nextValue);
      if (nextValue) {
        handleSearch(nextValue, setOptions);
      } else {
        setOptions([]);
      }
    },
    [handleSearch]
  );

  return (
    <Combobox
      value={value}
      options={options}
      size={SIZE.large}
      onChange={handleChange}
      mapOptionToString={mapOptions}
      overrides={overrides}
    />
  );
};

export default TickerInput;
