import {
  useCallback,
  useEffect,
} from "react";
import {
  HistoricalPrice,
} from "@chancey/iex-cloud";
import {
  differenceInBusinessDays,
  isBefore,
  isSameDay,
  isSaturday,
  isSunday,
  isWeekend,
  setDay,
} from "date-fns";
import {
  List,
} from "immutable";
import {
  useRecoilState,
  useRecoilValue,
} from "recoil";

import {
  useRedirectToDate,
} from "utils/Hooks";
import {
  DateFormats,
  handleUnloadCreator,
  parseDate,
  usePrevious,
} from "utils/Utilities";
import {
  historicalPricesState,
  presentPricesState,
} from "store/Atoms";

/**
 * @description Updates presentPrices in state when date URL param changes
 * @param {Date | undefined} date End date of historical prices to set present prices from
 * @returns {void} Nothing
 */
export const useEffectPresentPrices = (
  date: Date | undefined,
): void =>
{
  const {
    redirectToDate,
  } = useRedirectToDate();

  const previousDate = usePrevious(
    date,
  );

  const historicalPrices = useRecoilValue(
    historicalPricesState,
  );
  const [
    presentPrices,
    setPresentPrices,
  ] = useRecoilState(
    presentPricesState,
  );

  const updatePresentPrices = useCallback(
    (
      endIndex: number,
    ) =>
    {
      /**
       * @summary Set startIndex to 0 if otherwise
       * smaller than is possible (ie, negative)
       */
      const startIndex = Math.max(
        endIndex - 261,
        0,
      );

      console.log(
        "\n\n\n\n",
        "Made it",
        "\n",
        startIndex,
        endIndex,
        "\n\n\n\n",
      );

      /**
       * @summary Cut out the next present prices and set them
       */
      setPresentPrices(
        historicalPrices.slice(
          startIndex,
          endIndex,
        ),
      );
    },
    [
      setPresentPrices,
      historicalPrices,
    ],
  );
  const sliceHistoricalPrices = useCallback(
    (
      index: number,
      difference: number,
    ) =>
    {
      if (difference > 0)
      {
        return historicalPrices.slice(
          index,
          index + difference,
        );
      }

      return historicalPrices.slice(
        index + difference,
        index,
      );
    },
    [
      historicalPrices,
    ],
  );

  return useEffect(
    () =>
    {
      /**
       * @summary Get boolean checks here to improve readability below
       */
      const historicalPricesHasLoaded = !historicalPrices.isEmpty();
      const presentPricesHasLoaded = !presentPrices.isEmpty();
      const dateHasSameValue = (
        date === previousDate
      );

      /**
       * @summary Stop if historical prices hasn't loaded; stop if
       * date has not changed and present prices has already loaded
       */
      if (
        !date ||
        !historicalPricesHasLoaded ||
        (
          dateHasSameValue &&
          presentPricesHasLoaded
        )
      )
      {
        return undefined;
      }

      /**
       * @summary Forward to closest weekday if its a weekend
       */
      if (
        isWeekend(
          date,
        )
      )
      {
        /**
         * @summary Redirect to Friday if it's Saturday
         */
        if (
          isSaturday(
            date,
          )
        )
        {
          return redirectToDate(
            setDay(
              date,
              5,
            ),
          );
        }
        /**
         * @summary Redirect to Monday if it's Sunday
         */
        else if (
          isSunday(
            date,
          )
        )
        {
          return redirectToDate(
            setDay(
              date,
              1,
            ),
          );
        }
      }

      /**
       * @summary Get the last historical price and parse its date
       */
      const lastPrice = historicalPrices.last<undefined>();

      if (!lastPrice)
      {
        return;
      }

      const {
        date: lastDateAsString,
      } = lastPrice;
      const lastDate = parseDate(
        lastDateAsString,
        DateFormats.Iex,
      );

      /**
       * @summary Get the indexes difference between last date and end date
       */
      const endIndexesDifference = differenceInBusinessDays(
        lastDate,
        date,
      );

      /**
       * @summary Stop if end index date is in the future
       */
      if (
        !isBefore(
          date,
          lastDate,
        )
      )
      {
        return;
      }

      /**
         * @summary Lazily get the price at the indexes
         * we'll slice to (ie, the end) and convert its
         * date attribute to a Date type
         */
      const lazyEndIndex = historicalPrices.count() - endIndexesDifference;
      const lastEndPrice = historicalPrices.get<HistoricalPrice>(
        lazyEndIndex,
        historicalPrices.first(),
      );
      const lazyEndDate = parseDate(
        lastEndPrice.date,
        DateFormats.Iex,
      );

      /**
       * @summary Stop if this is already the correct date
       */
      if (
        isSameDay(
          date,
          lazyEndDate,
        )
      )
      {
        updatePresentPrices(
          lazyEndIndex,
        );

        return;
      }

      /**
       * @summary Determine the direction of the real value
       */
      const lazyIndexesDifference = differenceInBusinessDays(
        date,
        lazyEndDate,
      );

      /**
       * @summary Select indexes of historical prices from
       * lazy end index to maximum possible date, or vice
       * versa if the value is negative
       */
      const indexRange = sliceHistoricalPrices(
        lazyEndIndex,
        lazyIndexesDifference,
      );

      /**
       * @summary The last value is always the value we're
       * searching form, so set the count as the index
       */
      const endIndexInRange = indexRange.count();

      /**
       * @summary Create the end index from the range, relative
       * to the full array of historical prices
       */
      const endIndex = endIndexInRange + lazyEndIndex;

      /**
       * @summary Update the present prices!
       */
      updatePresentPrices(
        endIndex,
      );
    },
    [
      date,
      historicalPrices,
      presentPrices,
      previousDate,
      redirectToDate,
      sliceHistoricalPrices,
      updatePresentPrices,
    ],
  );
};
