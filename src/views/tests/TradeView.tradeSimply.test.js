import buyShares from "./events/buyShares";
import clickContinue from "./events/clickContinue";
import clickSell from "./events/clickSell";
import sellShares from "./events/sellShares";
import render from "./render/TradeView";

it(
  "conducts a simple trade",
  async () =>
  {
    render();

    await buyShares(
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

    await sellShares(
      {
        TotalShares: 0,
        OpenPrice: 3.2,
        OpenCount: 200,
        ClosePrice: 3.79,
        CloseCount: 200,
        ChangeBalance: 118,
        ChangePercent: 0.184375,
        LedgerBalance: 10118,
        LedgerReturns: 118,
        LedgerChange: 0.012606837606838,
      },
      1,
    );
  },
);
