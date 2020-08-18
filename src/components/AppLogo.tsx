import React from "react";
import {
  Box, ThemeContext,
} from "grommet";

import logo from "theme/logo.png";
import Anchor from "components/Grommet/Anchor";

import {
  StyledImage,
  StyledText,
} from "./AppLogo.styled";

type Props = unknown;

const AppLogo: React.FC<Props> = () =>
{
  return (
    <ThemeContext.Extend
      value={
        {
          anchor: {
            color: "text-strong",
            fontWeight: 900,
            textDecoration: "none",
            hover: {
              textDecoration: "none",
            },
            extend: () =>
            {
              return `
                font-family: 'Catamaran';
              `;
            },
          },
        }
      }
    >
      <Anchor to="/">
        <Box
          direction="row"
          height="xxsmall"
        >
          <StyledImage
            src={logo}
            fill="vertical"
            margin={
              {
                right: "small",
              }
            }
          />
          <StyledText size="logo">
          Stoxbie
          </StyledText>
        </Box>
      </Anchor>
    </ThemeContext.Extend>
  );
};

export default AppLogo;
