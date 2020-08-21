import React from "react";
import {
  Checkmark,
} from "grommet-icons";

import {
  StyledContainer,
} from "./TradeActionEnhancer.styled";

type Props = {
  isActive: boolean;
  Icon: React.ComponentType<IconProps>;
};

const TradeActionEnhancer: React.FC<Props> = (
  {
    isActive,
    Icon = Checkmark,
  },
) =>
{
  if (!isActive)
  {
    return <StyledContainer />;
  }

  return (
    <StyledContainer>
      <Icon data-testid="check" />
    </StyledContainer>
  );
};

export default TradeActionEnhancer;
