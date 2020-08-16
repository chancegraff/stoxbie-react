import React from "react";
import {
  useStyletron,
} from "baseui/dist";
import {
  Box,
} from "grommet";

type Props = unknown;

const PageBackground: React.FC<Props> = (
  props,
) =>
{
  const [
    ,
    theme,
  ] = useStyletron();

  return (
    <Box
      background={theme.colors.backgroundPrimary}
      color={theme.colors.contentPrimary}
      height="100%"
      width="100%"
    >
      {props.children}
    </Box>
  );
};

export default PageBackground;
