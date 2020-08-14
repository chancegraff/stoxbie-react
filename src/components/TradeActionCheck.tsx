import React from "react";
import {
  Block,
} from "baseui/dist/block";
import {
  IconProps,
} from "baseui/dist/icon";

type Props = {
  isActive: boolean;
  EndEnhancer: React.FC<IconProps>;
};

const TradeActionCheck: React.FC<Props> = (
  {
    isActive,
    EndEnhancer,
  },
) =>
{
  if (!isActive)
  {
    return <Block />;
  }

  return (
    <Block>
      <EndEnhancer data-testid="check" />
    </Block>
  );
};

export default TradeActionCheck;
