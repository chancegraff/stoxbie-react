import React, {
  Ref,
} from "react";
import {
  AvatarProps,
  BoxProps,
  ButtonProps,
  CalendarProps,
  DropButtonProps,
  DropProps,
  GridProps,
  HeadingProps,
  ImageProps,
  TableBodyProps,
  TableCellProps,
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
  MarkRequired,
} from "ts-essentials";

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

  declare type CalendarSelectProp<P> = {
    onSelect?: (
      (
        select: P
      ) => any
    );
  }

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
  declare type IntrinsicTableCell = Omit<JSX.IntrinsicElements["td"], "align">;
  declare type IntrinsicCalendar = Omit<JSX.IntrinsicElements["div"], "onSelect">;
  declare type IntrinsicTextInput = Omit<IntrinsicInput, "onSelect" | "size" | "placeholder">;
  declare type IntrinsicHeading = Omit<JSX.IntrinsicElements["h1"], "color">
    | Omit<JSX.IntrinsicElements["h2"], "color">
    | Omit<JSX.IntrinsicElements["h3"], "color">
    | Omit<JSX.IntrinsicElements["h4"], "color">
    | Omit<JSX.IntrinsicElements["h5"], "color">
    | Omit<JSX.IntrinsicElements["h6"], "color">;

  declare type JSXBoxProps = BoxProps & JSXProps<HTMLDivElement, IntrinsicDiv>;
  declare type JSXDropProps = MarkRequired<DropProps, "target"> & JSXProps<HTMLDivElement, IntrinsicDiv>;
  declare type JSXImageProps = ImageProps & JSXProps<HTMLImageElement, IntrinsicImage>;
  declare type JSXTextProps = TextProps & JSXProps<HTMLSpanElement, IntrinsicSpan>;
  declare type JSXHeadingProps = HeadingProps & JSXProps<HTMLHeadingElement, IntrinsicHeading>;
  declare type JSXAvatarProps = AvatarProps & JSXProps<HTMLDivElement, IntrinsicDiv>;
  declare type JSXButtonProps = ButtonProps & JSXProps<HTMLButtonElement, IntrinsicButton>;
  declare type JSXDropButtonProps = DropButtonProps & ButtonProps & JSXProps<HTMLButtonElement, IntrinsicButton>;
  declare type JSXGridProps = GridProps & JSXProps<HTMLDivElement, IntrinsicDiv>;
  declare type JSXRangeInputProps = RangeInputProps & JSXProps<HTMLInputElement, IntrinsicInput>;
  declare type JSXTableProps = TableProps & JSXProps<HTMLTableElement, IntrinsicTable>;
  declare type JSXTableHeaderProps = TableHeaderProps & JSXProps<HTMLTableHeaderElement, IntrinsicTableHead>;
  declare type JSXTableBodyProps = TableBodyProps & JSXProps<HTMLTableBodyElement, IntrinsicTableBody>;
  declare type JSXTableFooterProps = TableFooterProps & JSXProps<HTMLTableFooterElement, IntrinsicTableFoot>;
  declare type JSXTableRowProps = TableRowProps & JSXProps<HTMLTableRowElement, IntrinsicTableRow>;
  declare type JSXTableCellProps = TableCellProps & JSXBoxProps & JSXProps<HTMLTableCellElement, IntrinsicTableCell>;
  declare type JSXCalendarProps<P> = Omit<CalendarProps, "onSelect"> & CalendarSelectProp<P> & JSXProps<HTMLDivElement, IntrinsicCalendar>;
  declare type JSXTextInputProps<P> = Omit<TextInputProps, "onSelect"> & TextInputSelectProp<P> & JSXProps<HTMLInputElement, IntrinsicTextInput>;

  /* eslint-disable newline-after-var */
  declare const Box: React.FC<JSXBoxProps>;
  declare const Header: React.FC<JSXBoxProps>;
  declare const Main: React.FC<JSXBoxProps>;
  declare const Footer: React.FC<JSXBoxProps>;
  declare const Drop: React.FC<JSXDropProps>;
  declare const Calendar: React.FC<JSXCalendarProps>;
  declare const Image: React.FC<JSXImageProps>;
  declare const Text: React.FC<JSXTextProps>;
  declare const Heading: React.FC<JSXHeadingProps>;
  declare const Avatar: React.FC<JSXAvatarProps>;
  declare const Button: React.FC<JSXButtonProps>;
  declare const DropButton: React.FC<JSXDropButtonProps>;
  declare const Grid: React.FC<JSXGridProps>;
  declare const RangeInput: React.FC<JSXRangeInputProps>;
  declare const TextInput: React.FC<JSXTextInputProps<P>>;
  declare const Table: React.FC<JSXTableProps>;
  declare const TableHeader: React.FC<JSXTableHeaderProps>;
  declare const TableBody: React.FC<JSXTableBodyProps>;
  declare const TableFooter: React.FC<JSXTableFooterProps>;
  declare const TableRow: React.FC<JSXTableRowProps>;
  declare const TableCell: React.FC<JSXTableCellProps>;
  /* eslint-enable newline-after-var */

  declare interface RequiredThemeProps extends DeepRequired<ThemeType> {}
}
