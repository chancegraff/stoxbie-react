import calculateTrade from "./calculateTrade";
import {
  dayFivePrice,
  dayFourPrice,
  dayOnePrice,
  dayThreePrice,
  dayTwoPrice,
} from "./prices";

// Day 1: Buy 200 shares @ 3.2
// (200) 3.2 / - / - / -    <<
//                 - / 9360
export const fromFirstDay = {
  firstOpenedTrade: calculateTrade(
    dayOnePrice.close,
    200,
  ),
};

// Day 2: Sell 50/200 shares @ 3.79
// (150)  3.2 / -    / -   / -
// (50)   3.2 / 3.79 / 18% / 29.50    <<
//                     0%   / 9549.50
export const fromSecondDay = {
  firstClosedTrade: calculateTrade(
    dayTwoPrice.close,
    50,
    fromFirstDay.firstOpenedTrade,
  ),
  remainingFirstOpenedTrade: calculateTrade(
    dayOnePrice.close,
    150,
  ),
};

// Day 3: Buy 100 shares @ 3.67
// (100)  3.67 / -    / -   / -       <<
// (150)  3.2  / -    / -   / -       xx
// (50)   3.2  / 3.79 / 18% / 29.50
//                      0%  / 9182.50
export const fromThirdDay = {
  secondOpenedTrade: calculateTrade(
    dayThreePrice.close,
    100,
    {
      OpenPrice: Math.min(
        dayThreePrice.close,
        dayOnePrice.close,
      ),
      LedgerBalance: fromSecondDay.firstClosedTrade.LedgerBalance,
      LedgerReturns: fromSecondDay.firstClosedTrade.LedgerReturns,
      LedgerChange: fromSecondDay.firstClosedTrade.LedgerChange,
    },
  ),
};

// Day 4: Sell 150/250 shares @ 3.78
// (100)  3.67 / -    / -   / -
// (150)  3.2  / 3.78 / 18% / 87      <<
// (50)   3.2  / 3.79 / 18% / 29.50
//                      1%   / 9749.5
export const fromFourthDay = {
  secondClosedTrade: calculateTrade(
    dayFourPrice.close,
    150,
    {
      ...fromSecondDay.remainingFirstOpenedTrade,
      LedgerBalance: fromThirdDay.secondOpenedTrade.LedgerBalance,
      LedgerReturns: fromThirdDay.secondOpenedTrade.LedgerReturns,
      LedgerChange: fromThirdDay.secondOpenedTrade.LedgerChange,
    },
  ),
};

// Day 5: Sell 100/100 shares @ 3.79
// (100)  3.67 / 3.79 / 3%  / 12       <<
// (150)  3.2  / 3.78 / 18% / 87
// (50)   3.2  / 3.79 / 18% / 29.50
//                      1%   / 10128.5
export const fromFifthDay = {
  thirdClosedTrade: calculateTrade(
    dayFivePrice.close,
    100,
    {
      ...fromThirdDay.secondOpenedTrade,
      LedgerBalance: fromFourthDay.secondClosedTrade.LedgerBalance,
      LedgerReturns: fromFourthDay.secondClosedTrade.LedgerReturns,
      LedgerChange: fromFourthDay.secondClosedTrade.LedgerChange,
    },
  ),
};
