import React from "react";
import {
  Block,
} from "baseui/dist/block";

type Props = {
  isActive: boolean;
  EndEnhancer: React.FC;
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
      <EndEnhancer />
    </Block>
  );
};

export default TradeActionCheck;
