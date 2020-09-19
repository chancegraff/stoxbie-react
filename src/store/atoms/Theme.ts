import {
  atom,
} from "recoil";

import {
  THEME_STATE_KEY,
} from "utils/Constants";

export enum ThemeState {
  Light = "light",
  Dark = "dark",
}

/**
 * @description Current theme state
 */
export const themeState = atom<ThemeState>(
  {
    key: THEME_STATE_KEY,
    default: ThemeState.Light,
  },
);
