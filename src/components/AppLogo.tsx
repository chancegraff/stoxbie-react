import React from "react";

import logo from "theme/logo.png";
import Anchor from "components/Grommet/Anchor";

import {
  ExtendedTheme,
  StyledContainer,
  StyledImage,
  StyledText,
} from "./AppLogo.styled";

type Props = unknown;

const AppLogo: React.FC<Props> = () =>
{
  return (
    <ExtendedTheme>
      <Anchor to="/">
        <StyledContainer>
          <StyledImage src={logo} />
          <StyledText>
            Stoxbie
          </StyledText>
        </StyledContainer>
      </Anchor>
    </ExtendedTheme>
  );
};

export default AppLogo;
