import React from "react";
import {
  Check,
  IconProps,
} from "baseui/dist/icon";

import {
  Container,
} from "./TradeActionEnhancer.styled";

type Props = {
  isActive: boolean;
  EndEnhancer: React.FC<IconProps>;
};

const TradeActionCheck: React.FC<Props> = (
  {
    isActive,
    EndEnhancer = Check,
  },
) =>
{
  if (!isActive)
  {
    return <Container />;
  }

  return (
    <Container>
      <EndEnhancer data-testid="check" />
    </Container>
  );
};

export default TradeActionCheck;
