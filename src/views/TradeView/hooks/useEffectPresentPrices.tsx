import {
  useEffect,
} from "react";
import {
  HistoricalPrice,
} from "@chancey/iex-cloud";
import {
  differenceInBusinessDays,
  isBefore,
} from "date-fns";
import {
  useRecoilState,
  useRecoilValue,
} from "recoil";

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
 * @param {Date} date End date of historical prices to set present prices from
 * @returns {void} Nothing
 */
export const useEffectPresentPrices = (
  date: Date,
): void =>
{
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
       * @summary Get the last historical price and parse its date
       */
      const {
        date: lastDateAsString,
      } = historicalPrices.last<HistoricalPrice>();
      const lastDate = parseDate(
        lastDateAsString,
        DateFormats.Iex,
      );

      debugger;

      /**
       * @summary Get the indexes difference between last date and end date
       */
      const endIndexDate = date;
      const endIndexesDifference = differenceInBusinessDays(
        lastDate,
        endIndexDate,
      );

      /**
       * @summary Stop if end index date is in the future
       */
      if (
        isBefore(
          endIndexDate,
          lastDate,
        )
      )
      {
        /**
         * @summary Get the indexes to splice from, and set startIndex
         * to 0 if otherwise smaller than is possible (ie, negative)
         */
        const endIndex = historicalPrices.count() - endIndexesDifference;
        const startIndex = Math.max(
          endIndex - 261,
          0,
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
      }
    },
    [
      date,
      previousDate,
      historicalPrices,
      presentPrices,
      setPresentPrices,
    ],
  );
};
