import React from "react";
import {
  Heading,
  JSXHeadingProps,
  JSXTextProps,
  Text,
} from "grommet";

export const GrommetHeading: React.FC<JSXHeadingProps> = (
  props,
) =>
{
  return (
    <Heading
      level="1"
      size="large"
      {...props}
    >
      Ticker Search
    </Heading>
  );
};

export const GrommetText: React.FC<JSXTextProps> = (
  props,
) =>
{
  return (
    <Text
      size="small"
      color="text-xweak"
      margin="small"
      {...props}
    >
      Select the stock ticker to trade.
    </Text>
  );
};
