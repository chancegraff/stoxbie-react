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
  useRecoilState,
  useRecoilValue,
} from "recoil";

import {
  useRedirectToDate,
} from "utils/Hooks";
import {
  createLogger,
} from "utils/Logger";
import {
  DateFormats,
  parseDate,
  usePrevious,
} from "utils/Utilities";
import {
  historicalPricesState,
  presentPricesState,
} from "store/Atoms";

const logger = createLogger(
  "useEffectPresentPrices",
);

/**
 * @bug There's an issue with some end indexes not being found properly that
 * will get fixed by turning some part of this into a recursive function; see
 * the trade page for NFLX/m11d10y2015 to get an example
 *
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

  const shouldStop = useCallback(
    (
      selectedDate: Date,
    ) =>
    {
      /**
       * @summary Get boolean checks here to improve readability below
       */
      const historicalPricesHasLoaded = !historicalPrices.isEmpty();
      const presentPricesHasLoaded = !presentPrices.isEmpty();
      const dateHasSameValue = (
        selectedDate === previousDate
      );

      /**
       * @summary Stop if historical prices hasn't loaded; stop if
       * date has not changed and present prices has already loaded
       */
      return (
        !historicalPricesHasLoaded ||
        (
          dateHasSameValue &&
          presentPricesHasLoaded
        )
      );
    },
    [
      historicalPrices,
      presentPrices,
      previousDate,
    ],
  );
  const redirectFromWeekend = useCallback(
    (
      selectedDate: Date,
    ) =>
    {
      /**
       * @summary Forward to closest weekday if its a weekend
       */
      if (
        isWeekend(
          selectedDate,
        )
      )
      {
        /**
         * @summary Redirect to Friday if it's Saturday
         */
        if (
          isSaturday(
            selectedDate,
          )
        )
        {
          return setDay(
            selectedDate,
            5,
          );
        }
        /**
         * @summary Redirect to Monday if it's Sunday
         */
        else if (
          isSunday(
            selectedDate,
          )
        )
        {
          return setDay(
            selectedDate,
            1,
          );
        }
      }
    },
    [],
  );
  const getLastHistoricalPriceDate = useCallback(
    () =>
    {
      /**
       * @summary Get the last historical price and parse its date
       */
      const {
        date: lastDateAsString,
      } = historicalPrices.last<HistoricalPrice>();
      const lastDate = parseDate(
        lastDateAsString,
        DateFormats.Iex,
      );

      return lastDate;
    },
    [
      historicalPrices,
    ],
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

      /**
       * @summary Cut out the next present prices and set them
       */
      const nextPrices = historicalPrices.slice(
        startIndex,
        endIndex,
      );

      logger.debug(
        "Updating present prices",
      );

      setPresentPrices(
        nextPrices,
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
  const redirectFromMissingDate = useCallback(
    (
      indexAfterSelectedDate: number,
    ) =>
    {
      const priceAfterSelectedDate = historicalPrices.get(
        indexAfterSelectedDate,
        historicalPrices.last<HistoricalPrice>(),
      );
      const dateAfterSelected = parseDate(
        priceAfterSelectedDate.date,
        DateFormats.Iex,
      );

      logger.debug(
        "Redirecting to next date in index range",
        {
          dateAtSelection: historicalPrices.get(
            indexAfterSelectedDate - 1,
          ),
          dateAfterSelected,
        },
      );

      redirectToDate(
        dateAfterSelected,
      );
    },
    [
      historicalPrices,
      redirectToDate,
    ],
  );
  const lazilyGetHistoricalPriceIndex = useCallback(
    (
      selectedDate: Date,
      endIndexesDifference: number,
    ) =>
    {
      /**
         * @summary Lazily get the price at the indexes
         * we'll slice to (ie, the end) and convert its
         * date attribute to a Date type
         */
      const lazyEndIndex = historicalPrices.count() - endIndexesDifference;
      const lazyEndPrice = historicalPrices.get(
        lazyEndIndex,
        historicalPrices.last<HistoricalPrice>(),
      );
      const lazyEndDate = parseDate(
        lazyEndPrice.date,
        DateFormats.Iex,
      );

      /**
         * @summary Stop if this is already the correct date
         */
      if (
        isSameDay(
          selectedDate,
          lazyEndDate,
        )
      )
      {
        logger.debug(
          "Lazy index is selected day",
        );

        return {
          lazyIndex: lazyEndIndex,
          indexAfterSelectedDate: lazyEndIndex + 1,
        };
      }

      /**
       * @summary Get the difference in business days between
       * the lazy end date and the selected end date
       */
      const lazyIndexesDifference = differenceInBusinessDays(
        selectedDate,
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
       * @summary Value is usually at end, so reverse the List
       * and search it to get the real index while saving the
       * next value after the actual date if it's been passed
       */
      const reversedIndexRange = indexRange.reverse();

      /**
       * @summary With reversed array, get first date after the
       * selection (which would be the first date before the selection)
       */
      const firstIndexAfterDateInReverseRange = reversedIndexRange.findIndex(
        (
          historicalPrice,
        ) =>
        {
          const priceDate = parseDate(
            historicalPrice.date,
            DateFormats.Iex,
          );

          return isBefore(
            priceDate,
            selectedDate,
          );
        },
      );

      /**
       * @summary Slice from the first index before the selected date
       */
      const filteredAndReversedIndexRange = reversedIndexRange.slice(
        0,
        firstIndexAfterDateInReverseRange,
      );

      /**
       * @summary Find the selected date within the filtered and
       * reversed index range
       */
      const endIndexInReversedRange = filteredAndReversedIndexRange.findIndex(
        (
          historicalPrice,
        ) =>
        {
          const priceDate = parseDate(
            historicalPrice.date,
            DateFormats.Iex,
          );

          return (
            isSameDay(
              priceDate,
              selectedDate,
            )
          );
        },
      );

      /**
       * @summary Couldn't find the value in the range, so we
       * can instead return the index for the very next date
       */
      if (endIndexInReversedRange === -1)
      {
        return {
          lazyIndex: undefined,
          indexAfterSelectedDate: lazyEndIndex + lazyIndexesDifference - firstIndexAfterDateInReverseRange,
        };
      }

      /**
       * @summary Calculate the end index given that the above
       * value we've found is from the backwards array; if there
       * are 500 items in the range, and the index in the reversed
       * range is 100, that means the real index is at 400;
       * 500 - 100 = 400, which is what we'll now calculate
       */
      const endIndexInRange = lazyIndexesDifference - endIndexInReversedRange;

      /**
       * @summary Create the end index from the range relative
       * to the full array of historical prices and return it
       */
      return {
        lazyIndex: endIndexInRange + lazyEndIndex,
        indexAfterSelectedDate: endIndexInRange + lazyEndIndex + 1,
      };
    },
    [
      historicalPrices,
      sliceHistoricalPrices,
    ],
  );

  useEffect(
    () =>
    {
      if (
        !date ||
        shouldStop(
          date,
        )
      )
      {
        return;
      }

      logger.debug(
        "Effect called to update present prices",
      );

      const fromWeekendDate = redirectFromWeekend(
        date,
      );

      if (fromWeekendDate)
      {
        logger.debug(
          "Redirect from weekend date",
        );

        return redirectToDate(
          fromWeekendDate,
        );
      }

      /**
       * @summary Get the last date and the difference in days
       * between it and the selected date
       */
      const lastDate = getLastHistoricalPriceDate();

      /**
       * @summary Get the indexes difference between the last date
       * and end date
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
        logger.error(
          "Requested date is in the future",
        );

        return;
      }

      const {
        lazyIndex,
        indexAfterSelectedDate,
      } = lazilyGetHistoricalPriceIndex(
        date,
        endIndexesDifference,
      );

      if (!lazyIndex)
      {
        redirectFromMissingDate(
          indexAfterSelectedDate,
        );

        return;
      }

      updatePresentPrices(
        lazyIndex,
      );
    },
    [
      date,
      shouldStop,
      redirectFromWeekend,
      redirectToDate,
      updatePresentPrices,
      getLastHistoricalPriceDate,
      redirectFromMissingDate,
      lazilyGetHistoricalPriceIndex,
    ],
  );
};
