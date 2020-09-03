import React from "react";

import logo from "theme/logo.png";
import Anchor from "components/Grommet/Anchor";

import {
  GrommetContainer,
  GrommetImage,
  GrommetText,
  GrommetTheme,
} from "./AppLogo.styled";

type Props = unknown;

const AppLogo: React.FC<Props> = () =>
{
  return (
    <GrommetTheme
      css=""
    >
      <Anchor
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
