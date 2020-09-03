type ColorType = import(
  "grommet/utils"
).ColorType;
type OpacityType = import(
  "grommet/utils"
).OpacityType;

declare module "grommet/utils/colors" {
  declare const getRGBA: (color: ColorType, opacity: OpacityType) => string | undefined;
}
