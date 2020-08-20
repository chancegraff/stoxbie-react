import React from "react";
import {
  Option,
} from "baseui/dist/select";
import {
  Box, Text,
} from "grommet";

type Props = {
  option?: Option;
};

const Label: React.FC<Props> = (
  {
    option,
  },
) =>
{
  return (
    <Box align="baseline">
      <Text
        size="medium"
        color="text"
      >
        {option?.symbol}
      </Text>
      <Text
        size="xsmall"
        color="text-xweak"
      >
        {option?.securityName}
      </Text>
    </Box>
  );
};

export default Label;
