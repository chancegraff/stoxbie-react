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
  TableRowProps,
  TextInputProps,
  TextProps,
  ThemeType,
} from "grommet";
import {
  DeepRequired,
} from "util-types";

declare module "grommet" {
  declare type DropStates = "opened" | "closed";

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

  declare type JSXProps<P, E> = {
    ref?: Ref<P | undefined>;
  } & Omit<E, "ref">;

  declare type IntrinsicDiv = JSX.IntrinsicElements["div"];
  declare type IntrinsicImage = JSX.IntrinsicElements["img"];
  declare type IntrinsicSpan = JSX.IntrinsicElements["span"];
  declare type IntrinsicButton = Omit<JSX.IntrinsicElements["button"], "color">;
  declare type IntrinsicInput = JSX.IntrinsicElements["input"];
  declare type IntrinsicTable = JSX.IntrinsicElements["table"];
  declare type IntrinsicTableHead = JSX.IntrinsicElements["thead"];
  declare type IntrinsicTableBody = JSX.IntrinsicElements["tbody"];
  declare type IntrinsicTableFoot = JSX.IntrinsicElements["tfoot"];
  declare type IntrinsicTableRow = JSX.IntrinsicElements["tr"];
  declare type IntrinsicTextInput = Omit<IntrinsicInput, "onSelect" | "size" | "placeholder">;

  declare type JSXBoxProps = BoxProps & JSXProps<HTMLDivElement, IntrinsicDiv>;
  declare type JSXImageProps = ImageProps & JSXProps<HTMLImageElement, IntrinsicImage>;
  declare type JSXTextProps = TextProps & JSXProps<HTMLSpanElement, IntrinsicSpan>;
  declare type JSXAvatarProps = AvatarProps & JSXProps<HTMLDivElement, IntrinsicDiv>;
  declare type JSXButtonProps = ButtonProps & JSXProps<HTMLButtonElement, IntrinsicButton>;
  declare type JSXGridProps = GridProps & JSXProps<HTMLDivElement, IntrinsicDiv>;
  declare type JSXRangeInputProps = RangeInputProps & JSXProps<HTMLInputElement, IntrinsicInput>;
  declare type JSXTableProps = TableProps & JSXProps<HTMLTableElement, IntrinsicTable>;
  declare type JSXTableHeaderProps = TableHeaderProps & JSXProps<HTMLTableHeaderElement, IntrinsicTableHead>;
  declare type JSXTableBodyProps = TableBodyProps & JSXProps<HTMLTableBodyElement, IntrinsicTableBody>;
  declare type JSXTableFooterProps = TableFooterProps & JSXProps<HTMLTableFooterElement, IntrinsicTableFoot>;
  declare type JSXTableRowProps = TableRowProps & JSXProps<HTMLTableRowElement, IntrinsicTableRow>;
  declare type JSXTextInputProps<P> = Omit<TextInputProps, "onSelect"> & TextInputSelectProp<P> & JSXProps<HTMLInputElement, IntrinsicTextInput>;

  /* eslint-disable newline-after-var */
  declare const Box: React.FC<JSXBoxProps>;
  declare const Image: React.FC<JSXImageProps>;
  declare const Text: React.FC<JSXTextProps>;
  declare const Avatar: React.FC<JSXAvatarProps>;
  declare const Button: React.FC<JSXButtonProps>;
  declare const Grid: React.FC<JSXGridProps>;
  declare const RangeInput: React.FC<JSXRangeInputProps>;
  declare const TextInput: React.FC<JSXTextInputProps<P>>;
  declare const Table: React.FC<JSXTableProps>;
  declare const TableHeader: React.FC<JSXTableHeaderProps>;
  declare const TableBody: React.FC<JSXTableBodyProps>;
  declare const TableFooter: React.FC<JSXTableFooterProps>;
  declare const TableRow: React.FC<JSXTableRowProps>;
  /* eslint-enable newline-after-var */

  declare interface ThemeProps extends DeepRequired<ThemeType> {}
}
