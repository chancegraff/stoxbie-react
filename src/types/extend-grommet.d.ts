import {
  Ref,
} from "react";
import {
  AvatarProps,
  BoxProps,
  ButtonProps,
  GridProps,
  ImageProps,
  TableBodyProps,
  TableFooterProps,
  TableHeaderProps,
  TableProps,
  TextInputProps,
  TextProps,
  ThemeType,
} from "grommet";
import {
  DeepRequired,
} from "util-types";

declare module "grommet" {
  declare type DropStates = "opened" | "closed";

  declare type JSXProps<P, E> = {
    ref?: Ref<P | undefined>;
  } & Omit<E, "ref">;

  declare type JSXBoxProps = BoxProps & JSXProps<HTMLDivElement, JSX.IntrinsicElements["div"]>;
  declare const Box: React.FC<JSXBoxProps>;

  declare type JSXImageProps = ImageProps & JSXProps<HTMLImageElement, JSX.IntrinsicElements["img"]>;
  declare const Image: React.FC<JSXImageProps>;

  declare type JSXTextProps = TextProps & JSXProps<HTMLSpanElement, JSX.IntrinsicElements["span"]>;
  declare const Text: React.FC<JSXTextProps>;

  declare type JSXAvatarProps = AvatarProps & JSXProps<HTMLDivElement, JSX.IntrinsicElements["div"]>;
  declare const Avatar: React.FC<JSXAvatarProps>;

  declare type JSXButtonProps = ButtonProps & JSXProps<HTMLButtonElement, Omit<JSX.IntrinsicElements["button"], "color">>;
  declare const Button: React.FC<JSXButtonProps>;

  declare type JSXGridProps = GridProps & JSXProps<HTMLDivElement, JSX.IntrinsicElements["div"]>;
  declare const Grid: React.FC<JSXGridProps>;

  declare type JSXRangeInputProps = RangeInputProps & JSXProps<HTMLInputElement, JSX.IntrinsicElements["input"]>;
  declare const RangeInput: React.FC<JSXRangeInputProps>;

  declare type JSXTableProps = TableProps & JSXProps<HTMLTableElement, JSX.IntrinsicElements["table"]>;
  declare const Table: React.FC<JSXTableProps>;

  declare type JSXTableHeaderProps = TableHeaderProps & JSXProps<HTMLTableHeaderElement, JSX.IntrinsicElements["thead"]>;
  declare const TableHeader: React.FC<JSXTableHeaderProps>;

  declare type JSXTableBodyProps = TableBodyProps & JSXProps<HTMLTableBodyElement, JSX.IntrinsicElements["tbody"]>;
  declare const TableBody: React.FC<JSXTableBodyProps>;

  declare type JSXTableFooterProps = TableFooterProps & JSXProps<HTMLTableFooterElement, JSX.IntrinsicElements["tfoot"]>;
  declare const TableFooter: React.FC<JSXTableFooterProps>;

  declare type Value<P> = P;
  declare type Suggestion<P> = {
    label?: React.ReactNode;
    value?: Value<P>;
  };

  declare type SelectEvent<P> = {
    target: React.RefObject<P>["current"];
    suggestion: Suggestion<P>;
  };

  declare type TextInputSelectProp<P> = {
    onSelect: (
      (
        event: {
          target: React.RefObject<P>["current"];
          suggestion: Suggestion<P>;
        }
      ) => void
    );
  };

  declare type JSXTextInputProps<P> = Omit<TextInputProps, "onSelect"> & TextInputSelectProp<P> & Omit<JSX.IntrinsicElements["input"], "onSelect" | "size" | "placeholder">;
  declare const TextInput: React.FC<JSXTextInputProps<P>>;

  declare interface ThemeProps extends DeepRequired<ThemeType> {}
}
