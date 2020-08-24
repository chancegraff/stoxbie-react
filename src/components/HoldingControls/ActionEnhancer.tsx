import React from "react";
import {
  Checkmark,
  JSXIconProps,
} from "grommet-icons";

import {
  StyledContainer,
} from "./ActionEnhancer.styled";

type Props = {
  isActive: boolean;
  Icon: React.ComponentType<JSXIconProps>;
};

const ActionEnhancer: React.FC<Props> = (
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

export default ActionEnhancer;
