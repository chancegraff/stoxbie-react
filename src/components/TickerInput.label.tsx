import React from "react";
import {
  Option,
} from "baseui/dist/select";
import {
  Caption2,
  Label2,
} from "baseui/dist/typography";
import {
  Box,
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
      <Label2>
        {option?.symbol}
      </Label2>
      <Caption2 marginLeft="6px">
        {option?.securityName}
      </Caption2>
    </Box>
  );
};

export default Label;
