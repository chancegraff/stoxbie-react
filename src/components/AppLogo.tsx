import React from "react";
import {
  Box,
} from "grommet";

import logo from "theme/logo.png";

import {
  LogoImage,
  LogoText,
} from "./AppLogo.overrides";

type Props = unknown;

const AppLogo: React.FC<Props> = (
  props,
) =>
{
  return (
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
      >
        Stoxbie
      </LogoText>
    </Box>
  );
};

export default AppLogo;
