import React from "react";
import {
  Box, Main,
} from "grommet";

type Props = unknown;

const ContentContainer: React.FC<Props> = (
  props,
) =>
{
  return (
    <Main
      height="100%"
      pad={
        {
          vertical: "large",
          horizontal: "xlarge",
        }
      }
    >
      {props.children}
    </Main>
  );
};

export default ContentContainer;
