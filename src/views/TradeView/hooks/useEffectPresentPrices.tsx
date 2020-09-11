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
  DateFormats,
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

      /**
       * @summary Cut out the next present prices and set them
       */
      const nextPrices = historicalPrices.slice(
        startIndex,
        endIndex,
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

  useEffect(
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
        return;
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
      const lastPrice = historicalPrices.last<HistoricalPrice>();

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
        throw new Error(
          "Requested date is in the future",
        );
      }

      /**
         * @summary Lazily get the price at the indexes
         * we'll slice to (ie, the end) and convert its
         * date attribute to a Date type
         */
      const lazyEndIndex = historicalPrices.count() - endIndexesDifference;
      const lastEndPrice = historicalPrices.get<HistoricalPrice>(
        lazyEndIndex,
        historicalPrices.last(),
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
          lazyEndIndex + 1,
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
       * @summary Value is usually at end, so reverse the List
       * and search it to get the real index
       */
      const reversedIndexRange = indexRange.reverse();
      const endIndexInReversedRange = reversedIndexRange.findIndex(
        (
          historicalPrice,
        ) =>
        {
          const historicalPriceDate = parseDate(
            historicalPrice.date,
            DateFormats.Iex,
          );

          return isSameDay(
            date,
            historicalPriceDate,
          );
        },
      );

      if (endIndexInReversedRange === -1)
      {
        throw new Error(
          "End index not found in range",
        );
      }

      /**
       * @summary Calculate the end index given that the above
       * value we've found is from the backwards array; if there
       * are 500 items in the range, and the index in the reversed
       * range is 100, that means the real index is at 400;
       * 500 - 100 = 400, which is what we'll now calculate
       */
      const indexRangeLength = indexRange.count();
      const endIndexInRange = indexRangeLength - endIndexInReversedRange;

      /**
       * @summary Create the end index from the range, relative
       * to the full array of historical prices and update the prices!
       */
      const endIndex = endIndexInRange + lazyEndIndex;

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
