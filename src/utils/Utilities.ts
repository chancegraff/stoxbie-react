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

/**
 * @description Returns one of three variables given to it based
 * on the current environment the application is being run in.
 * Only lowLevel is required, but it will be returned exclusively
 * in development mode. Production tries to return highLevel first
 * before attempting to return midLevel instead. All other levels
 * inbetween will try to return midLevel before trying to return
 * highLevel last.
 * @summary
 *   |  Prod          ?  highLevel  ||  midLevel   |
 *   |  !Prod & !Dev  ?  midLevel   ||  highLevel  |
 *   |  Dev           ?  lowLevel   ||  undefined  |
 * @param {unknown} lowLevel For development environment
 * @param {unknown | undefined} midLevel For any environment between the two
 * @param {unknown | undefined} highLevel For production environment
 * @returns {unknown} Returns the variable that matches the environment
 */
export const awakenEnvironment = <T extends unknown>(
  lowLevel: T,
  midLevel?: T,
  highLevel?: T,
): T | undefined =>
{
  switch (process.env.NODE_ENV)
  {
    case "development":
    {
      return (
        lowLevel
      );
    }
    case "production":
    {
      return (
        highLevel ||
        midLevel
      );
    }
    default:
    {
      return (
        midLevel ||
        highLevel
      );
    }
  }
};

export const captitalizeString = (
  message: string,
) =>
{
  const [
    firstChar,
    ...remainingString
  ] = message;
  const rejoinedString = remainingString.join(
    "",
  );

  return `${firstChar.toUpperCase()}${rejoinedString}`;
};

export const hashString = (
  input: string,
) =>
{
  if (input.length === 0)
  {
    return 0;
  }

  const output = [
    ...input,
  ].reduce(
    (
      sum,
      char,
    ) =>
    {
      const code = char.charCodeAt(
        0,
      );

      let result = ((sum << 5) - sum) + code;

      result &= result;

      return result;
    },
    0,
  );

  return output;
};
