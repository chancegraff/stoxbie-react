import {
  clickBuy,
  clickContinue, clickSell,
} from "./helpers/events";
import {
  renderTradeView,
} from "./helpers/render";
import {
  shouldBuyShares,
} from "./helpers/shouldBuyShares";
import {
  shouldSellShares,
} from "./helpers/shouldSellShares";

it(
  "conducts a continuous trade",
  async () =>
  {
    renderTradeView();

    // Day 1: Buy 200 shares @ 3.2
    // (200) 3.2 / - / - / -    <<
    //                 - / 9360
    await shouldBuyShares(
      {
        TotalShares: 200,
        OpenPrice: 3.2,
        OpenCount: 200,
        ClosePrice: undefined,
        CloseCount: undefined,
        ChangeBalance: undefined,
        ChangePercent: undefined,
        LedgerBalance: 9360,
        LedgerReturns: undefined,
        LedgerChange: undefined,
      },
      1,
    );

    clickContinue();

    clickSell();

    // Day 2: Sell 50/200 shares @ 3.79
    // (150)  3.2 / -    / -   / -
    // (50)   3.2 / 3.79 / 18% / 29.50    <<
    //                     0%   / 9549.50
    await shouldSellShares(
      {
        TotalShares: 150,
        OpenPrice: 3.2,
        OpenCount: 200,
        ClosePrice: 3.79,
        CloseCount: 50,
        ChangeBalance: 29.50,
        ChangePercent: 0.184375,
        LedgerBalance: 9549.5,
        LedgerReturns: 29.50,
        LedgerChange: 0.0031517094,
      },
      2,
    );

    clickContinue();

    clickBuy();

    // Day 3: Buy 100 shares @ 3.67
    // (100)  3.67 / -    / -   / -       <<
    // (150)  3.2  / -    / -   / -       xx
    // (50)   3.2  / 3.79 / 18% / 29.50
    //                      0%  / 9182.50
    await shouldBuyShares(
      {
        TotalShares: 250,
        OpenPrice: 3.67,
        OpenCount: 100,
        ClosePrice: undefined,
        CloseCount: undefined,
        ChangeBalance: undefined,
        ChangePercent: undefined,
        LedgerBalance: 9182.5,
        LedgerReturns: 29.50,
        LedgerChange: 0.0031517094,
      },
      2,
    );

    clickContinue();

    clickSell();

    // Day 4: Sell 150/250 shares @ 3.78
    // (100)  3.67 / -    / -   / -
    // (150)  3.2  / 3.78 / 18% / 87      <<
    // (50)   3.2  / 3.79 / 18% / 29.50
    //                      1%   / 9749.5
    await shouldSellShares(
      {
        TotalShares: 100,
        OpenPrice: 3.2,
        OpenCount: 150,
        ClosePrice: 3.78,
        CloseCount: 150,
        ChangeBalance: 87,
        ChangePercent: 0.18125,
        LedgerBalance: 9749.5,
        LedgerReturns: 116.5,
        LedgerChange: 0.0126871766948,
      },
      3,
    );

    clickContinue();

    // Day 5: Sell 100/100 shares @ 3.79
    // (100)  3.67 / 3.79 / 3%  / 12       <<
    // (150)  3.2  / 3.78 / 18% / 87
    // (50)   3.2  / 3.79 / 18% / 29.50
    //                      1%   / 10128.5
    await shouldSellShares(
      {
        TotalShares: 0,
        OpenPrice: 3.67,
        OpenCount: 100,
        ClosePrice: 3.79,
        CloseCount: 100,
        ChangeBalance: 12,
        ChangePercent: 0.032697547683924,
        LedgerBalance: 10128.5,
        LedgerReturns: 128.5,
        LedgerChange: 0.013180163085286,
      },
      3,
    );
  },
);
