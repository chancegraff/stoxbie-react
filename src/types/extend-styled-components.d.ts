import {
  ThemeProps,
} from "grommet";

import "styled-components";

declare module "styled-components" {
  type ThemeType = ThemeProps & {
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
