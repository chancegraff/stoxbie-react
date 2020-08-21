import {
  grommet,
} from "grommet";
import {
  deepMerge,
} from "grommet/utils";

import anchor from "./anchor";
import borderSize from "./borderSize";
import breakpoints from "./breakpoints";
import button from "./button";
import colors from "./colors";
import control from "./control";
import drop from "./drop";
import edgeSize from "./edgeSize";
import font from "./font";
import heading from "./heading";
import layer from "./layer";
import paragraph from "./paragraph";
import size from "./size";
import text from "./text";

const global = {
  colors,
  font,
  control,
  drop,
  borderSize,
  breakpoints,
  edgeSize,
  size,
};

export default deepMerge(
  grommet,
  {
    name: "StoxTheme",
    rounding: 2,
    spacing: 24,
    defaultMode: "light",
    global,
    heading,
    paragraph,
    text,
    scale: 1.5,
    anchor,
    layer,
    button,
  },
);
