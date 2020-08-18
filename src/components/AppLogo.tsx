import React from "react";
import {
  Box,
} from "grommet";

import logo from "theme/logo.png";

import {
  LogoImage,
  LogoLink,
  LogoText,
} from "./AppLogo.overrides";

type Props = unknown;

const AppLogo: React.FC<Props> = () =>
{
  return (
    <LogoLink
      to="/"
    >
      <Box
        direction="row"
        height="xxsmall"
      >
        <LogoImage
          src={logo}
          fill="vertical"
          margin={
            {
              right: "small",
            }
          }
        />
        <LogoText
          size="logo"
          weight={800}
          color="text-strong"
        >
        Stoxbie
        </LogoText>
      </Box>
    </LogoLink>
  );
};

export default AppLogo;
