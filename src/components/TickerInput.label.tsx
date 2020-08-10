import React from "react";
import { Block } from "baseui/dist/block";
import { Option } from "baseui/dist/select";
import {
  Caption2,
  Label2,
} from "baseui/dist/typography";

type Props = {
  option?: Option;
};

const Label: React.FC<Props> = ({ option }) =>
{
  return (
    <Block
      alignItems="baseline"
      display="flex"
    >
      <Label2>
        {option?.symbol}
      </Label2>
      <Caption2 marginLeft="6px">
        {option?.securityName}
      </Caption2>
    </Block>
  );
};

export default Label;
