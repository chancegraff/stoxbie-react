import React, {
  PropsHasClass,
} from "react";

import logo from "theme/logo.png";
import Anchor from "components/Grommet/Anchor";

import {
  GrommetContainer,
  GrommetImage,
  GrommetText,
  GrommetTheme,
} from "./AppLogo.styled";

type Props = PropsHasClass;

const AppLogo: React.FC<Props> = (
  {
    className,
  },
) =>
{
  return (
    <GrommetTheme
      css=""
    >
      <Anchor
        className={className}
        css=""
        to="/"
      >
        <GrommetContainer css="">
          <GrommetImage
            css=""
            src={logo}
          />
          <GrommetText css="">
            Stoxbie
          </GrommetText>
        </GrommetContainer>
      </Anchor>
    </GrommetTheme>
  );
};

export default AppLogo;
