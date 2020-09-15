import {
  useCallback,
  useEffect,
} from "react";
import {
  HistoricalPrice,
} from "@chancey/iex-cloud";
import {
  differenceInBusinessDays,
  isAfter,
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
       * and search it to get the real index while saving the
       * next value after the actual date if it's been passed
       */
      const reversedIndexRange = indexRange.reverse();
      const indexRangeLength = indexRange.count();

      /**
       * @summary Hard loop so we can exit from it early if
       * we want while also allowing us to chunk in triplets
       */
      let endIndexInReversedRange = 0;

      for (; endIndexInReversedRange < indexRangeLength; endIndexInReversedRange += 3)
      {
        const historicalPrice = reversedIndexRange.get(
          endIndexInReversedRange,
        );

        /**
         * @summary Skip to the next value if we got undefined
         * at this index (how would this happen?)
         */
        if (!historicalPrice)
        {
          continue;
        }

        const priceDate = parseDate(
          historicalPrice.date,
          DateFormats.Iex,
        );

        /**
         * @summary Check that the price date hasn't passed the
         * chosen date; if we've finally passed the chosen date,
         * redirect to this date (which is the always the next
         * value in the array)
         */
        if (
          isAfter(
            priceDate,
            date,
          )
        )
        {
          return redirectToDate(
            priceDate,
          );
        }

        /**
         * @summary Haven't passed value yet so check it and
         * exit early if it matches
         */
        if (
          isSameDay(
            date,
            priceDate,
          )
        )
        {
          break;
        }
      }

      /**
       * @summary Return an error if we have no value at all
       */
      if (endIndexInReversedRange === -1)
      {
        throw new Error(
          `
          End index not found for {date} in {range}\n
          ${date}\n
          ${JSON.stringify(
            indexRange,
            null,
            2,
          )}\n

          `,
        );
      }

      /**
       * @summary Calculate the end index given that the above
       * value we've found is from the backwards array; if there
       * are 500 items in the range, and the index in the reversed
       * range is 100, that means the real index is at 400;
       * 500 - 100 = 400, which is what we'll now calculate
       */
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
