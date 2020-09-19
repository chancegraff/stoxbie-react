import React from "react";
import {
  Box,
  JSXBoxProps,
} from "grommet";

export const GrommetContainer: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <Box
      pad="small"
      alignSelf="center"
      margin={
        {
          left: "auto",
        }
      }
      round={true}
      background="background-contrast"
      {...props}
    />
  );
};
