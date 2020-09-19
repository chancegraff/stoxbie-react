import React, {
  useCallback,
} from "react";
import {
  JSXIconProps,
  Moon,
  Sun,
} from "grommet-icons";
import {
  useRecoilState,
} from "recoil";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  ThemeState,
  themeState,
} from "store/Atoms";

import {
  GrommetContainer,
} from "./PageTheme.styled";

type Props = unknown;

const PageTheme: React.FC<Props> = (
  props,
) =>
{
  const [
    theme,
    setTheme,
  ] = useRecoilState(
    themeState,
  );

  const Icon: React.FC<JSXIconProps> = useCallback(
    (
      iconProps,
    ) =>
    {
      if (theme === ThemeState.Dark)
      {
        return <Moon {...iconProps} />;
      }

      return <Sun {...iconProps} />;
    },
    [
      theme,
    ],
  );

  const setDarkTheme = useCallback(
    () =>
    {
      setTheme(
        ThemeState.Dark,
      );
    },
    [
      setTheme,
    ],
  );
  const setLightTheme = useCallback(
    () =>
    {
      setTheme(
        ThemeState.Light,
      );
    },
    [
      setTheme,
    ],
  );

  const handleClick = useCallback(
    () =>
    {
      switch (theme)
      {
        case ThemeState.Light:
        {
          return setDarkTheme();
        }
        case ThemeState.Dark:
        {
          return setLightTheme();
        }
      }
    },
    [
      theme,
      setDarkTheme,
      setLightTheme,
    ],
  );

  return (
    <GrommetContainer
      css=""
      onClick={handleClick}
    >
      <Icon
        size="24px"
        color="text-xweak"
      />
    </GrommetContainer>
  );
};

export default PageTheme;
