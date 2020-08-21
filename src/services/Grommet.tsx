import React, {
  useContext,
} from "react";
import {
  Grommet as GrommetProvider,
  ThemeContextI,
} from "grommet";
import {
  removeUndefined,
} from "grommet/utils";
import {
  DeepRequired,
} from "utility-types";

import Theme from "theme";

export const useTheme = (
  context: ThemeContextI,
) =>
{
  const rawTheme = useContext(
    context,
  ) || Theme;

  const theme = removeUndefined<ThemeType>(
    rawTheme,
  );

  return theme as DeepRequired<ThemeType>;
};

export const getColors = (
  color: string | {
    dark?: string;
    light?: string;
  },
) =>
{
  if (typeof color === "string" || !color.dark || !color.light)
  {
    return {};
  }

  return color;
};

const Grommet: React.FC = (
  props,
) =>
{
  return (
    <GrommetProvider
      full={true}
      theme={Theme}
      themeMode="dark"
    >
      {props.children}
    </GrommetProvider>
  );
};

export default Grommet;
