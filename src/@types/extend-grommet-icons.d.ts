import {
  IconProps,
} from "grommet-icons";

declare module "grommet-icons" {
  declare type JSXIconProps = IconProps & React.SVGProps<SVGSVGElement>;
  declare const Icon: React.FC<JSXIconProps>;
}
