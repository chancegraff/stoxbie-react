import clickContinue from "./events/clickContinue";
import clickSell from "./events/clickSell";
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
  "conducts a simple trade",
  async () =>
  {
    renderTradeView();

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

    await shouldSellShares(
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
