import React, { useState, useCallback } from "react";
import { Combobox, SIZE } from "baseui/combobox";
import { Search } from "iex-cloud";

type Props = {
  handleSearch: (
    nextValue: string,
    setOptions: React.Dispatch<React.SetStateAction<Search[]>>
  ) => void;
};

const TickerInput: React.FC<Props> = ({ handleSearch }) => {
  const [value, setValue] = useState<string>("");
  const [options, setOptions] = useState<Search[]>([]);

  const handleChange = useCallback((nextValue: string) => {
    setValue(nextValue);
    handleSearch(nextValue, setOptions);
  }, []);

  const mapOptions = useCallback((option: Search) => option.symbol, [options]);

  return (
    <Combobox
      value={value}
      options={options}
      size={SIZE.large}
      onChange={handleChange}
      mapOptionToString={mapOptions}
    />
  );
};

export default TickerInput;
