import {
  RequiredThemeProps,
} from "grommet";

import "styled-components";

declare module "styled-components" {
  type ThemeType = RequiredThemeProps & {
    name: string;
    rounding: number;
    spacing: number;
    defaultMode: "dark" | "light";
    scale: number;
    dark: boolean;
    baseBackground: ColorType;
  };

  declare interface DefaultTheme extends ThemeType {}
}
