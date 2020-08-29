import {
  Children,
  cloneElement,
  isValidElement,
  PropsHasChildren,
  useEffect,
  useRef,
} from "react";
import {
  format,
  parse,
  parseISO,
  subYears,
} from "date-fns";
import numbro from "numbro";

export const copyPropsToChildren = (
  {
    children,
    ...props
  }: PropsHasChildren,
): React.ReactNode =>
{
  return Children.map(
    children,
    (
      child,
    ) =>
    {
      if (isValidElement(
        child,
      ))
      {
        return cloneElement(
          child,
          props,
        );
      }

      return child;
    },
  );
};

export const parsePixels = (
  px: string,
): number =>
{
  return parseInt(
    px.replace(
      "px",
      "",
    ),
    10,
  );
};

export const handleUnloadCreator = (
  dispatchHandlers: React.Dispatch<React.SetStateAction<any | undefined>>[],
) =>
{
  return (): void =>
  {
    return dispatchHandlers.forEach(
      (
        dispatch,
      ) =>
      {
        return dispatch(
          undefined,
        );
      },
    );
  };
};

export const usePrevious = <P>(
  value: P | undefined,
): P | undefined =>
{
  const ref = useRef<P>();

  useEffect(
    () =>
    {
      ref.current = value;
    },
  );

  return ref.current;
};

export const today = new Date();

export const oneYearAgo = subYears(
  today,
  1,
);

export const fiveYearsAgo = subYears(
  today,
  5,
);

export const formatCount = (
  num: number,
) =>
{
  return numbro(
    num,
  ).format(
    {
      average: true,
      mantissa: 2,
      optionalMantissa: true,
    },
  );
};

export const formatCurrency = (
  num: number,
) =>
{
  return numbro(
    num,
  ).formatCurrency(
    {
      average: true,
      mantissa: 2,
      optionalMantissa: true,
    },
  );
};

export const formatPercentage = (
  num: number,
) =>
{
  return numbro(
    num,
  ).format(
    {
      average: true,
      output: "percent",
    },
  );
};

export enum DateFormats {
  Full = "MMMM do, y",
  Iex = "y-MM-dd",
  Url = "'m'MM'd'dd'y'y",
  TickLarge = "MMM ''yy",
  TickSmall = "MMM",
  TickYear = "y",
}

export const formatDate = (
  date: string | Date,
  dateFormat: DateFormats,
) =>
{
  return format(
    typeof date === "string"
      ? parseISO(
          date,
        )
      : date,
    dateFormat,
  );
};

export const parseDate = (
  date: string,
  dateFormat: DateFormats,
) =>
{
  return parse(
    date,
    dateFormat,
    new Date(),
  );
};

export const formatParsedDate = (
  asString: string,
  inputFormat: DateFormats,
  outputFormat: DateFormats,
) =>
{
  return formatDate(
    parseDate(
      asString,
      inputFormat,
    ),
    outputFormat,
  );
};
