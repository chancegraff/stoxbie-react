import React from "react";
import {
  Heading,
  JSXHeadingProps,
} from "grommet";

export const GrommetHeading: React.FC<JSXHeadingProps> = (
  props,
) =>
{
  return (
    <Heading
      css=""
      size="medium"
      level="1"
      {...props}
    />
  );
};
