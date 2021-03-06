import React from "react";
import {
  Search,
} from "@chancey/iex-cloud";
import {
  Box,
  DropStates,
  JSXBoxProps,
  JSXTextInputProps,
  TextInput,
  ThemeContext,
} from "grommet";

import {
  TICKER_INPUT_PLACERHOLDER,
} from "utils/Constants";

export const GrommetTheme: React.FC = (
  props,
) =>
{
  return (
    <ThemeContext.Extend
      value={
        {
          global: {
            drop: {
              extend: `
                border-radius: 0 0 2px 2px;
              `,
            },
          },
        }
      }
      {...props}
    />
  );
};

export const GrommetContainer: React.FC<JSXBoxProps & { dropState: DropStates }> = (
  {
    dropState,
    ...props
  },
) =>
{
  const additionalProps: JSXBoxProps = {
    background: "background-front",
  };

  if (dropState === "opened")
  {
    additionalProps.round = "2px 2px 0 0";
    additionalProps.elevation = "medium";
  }

  return (
    <Box
      {...props}
      {...additionalProps}
    />
  );
};

export const GrommetTextInput: React.FC<JSXTextInputProps<Search>> = (
  props,
) =>
{
  return (
    <TextInput
      plain={true}
      autoFocus={true}
      focusIndicator={false}
      role="search"
      type="search"
      placeholder={TICKER_INPUT_PLACERHOLDER}
      // dropProps={
      //   {
      //     plain: true,
      //   }
      // }
      {...props}
    />
  );
};
