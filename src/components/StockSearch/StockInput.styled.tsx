import React from "react";
import {
  Box,
  JSXBoxProps,
  JSXTextInputProps,
  TextInput,
} from "grommet";
import {
  Search,
} from "iex-cloud";

import {
  TICKER_INPUT_PLACERHOLDER,
} from "utils/Constants";

export const StyledContainer: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <Box
      {...props}
    />
  );
};

export const StyledTextInput: React.FC<JSXTextInputProps<Search>> = (
  props,
) =>
{
  return (
    <TextInput
      autoFocus={true}
      focusIndicator={false}
      type="search"
      placeholder={TICKER_INPUT_PLACERHOLDER}
      {...props}
    />
  );
};
