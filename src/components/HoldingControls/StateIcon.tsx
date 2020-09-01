import React, {
  PropsHasClass,
} from "react";
import {
  Checkmark,
  JSXIconProps,
} from "grommet-icons";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  GrommetContainer,
} from "./StateIcon.styled";

type Props = PropsHasClass & {
  isActive: boolean;
  Icon: React.ComponentType<JSXIconProps>;
};

const StateIcon: React.FC<Props> = (
  {
    className,
    isActive,
    Icon = Checkmark,
  },
) =>
{
  if (!isActive)
  {
    return (
      <GrommetContainer
        className={className}
        css=""
      />
    );
  }

  return (
    <GrommetContainer
      className={className}
      css=""
    >
      <Icon
        size="12px"
        data-testid="check"
      />
    </GrommetContainer>
  );
};

export default StateIcon;
