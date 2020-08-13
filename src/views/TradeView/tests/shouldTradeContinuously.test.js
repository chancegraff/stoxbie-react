import {
  clickContinue,
} from "./events";
import {
  renderView,
} from "./render";
import {
  shouldBuyShares,
} from "./shouldBuyShares";
import {
  shouldSellShares,
} from "./shouldSellShares";

it(
  "conducts a continuous trade",
  async () =>
  {
    renderView();

    // buys 200 shares on first day
    await shouldBuyShares(
      {
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

    // sells 50 shares on second day
    await shouldSellShares(
      {
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

    // buys 100 shares on third day
    await shouldBuyShares(
      {
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

    // sells 150 shares on fourth day
    await shouldSellShares(
      {
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

    // sells 100 shares on fifth day
    await shouldSellShares(
      {
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
