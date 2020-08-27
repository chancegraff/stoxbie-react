import React from "react";
import {
  Checkmark,
  JSXIconProps,
} from "grommet-icons";

import {
  StyledContainer,
} from "./StateIcon.styled";

type Props = {
  isActive: boolean;
  Icon: React.ComponentType<JSXIconProps>;
};

const StateIcon: React.FC<Props> = (
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
      <Icon
        size="12px"
        data-testid="check"
      />
    </StyledContainer>
  );
};

export default StateIcon;
