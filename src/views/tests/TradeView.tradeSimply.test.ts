import {
  buyShares,
  sellShares,
} from "utils/tests/E2E";
import {
  clickContinue,
  clickSell,
} from "utils/tests/Events";
import {
  renderTradeView,
} from "utils/tests/Renderers";

it(
  "conducts a simple trade",
  async () =>
  {
    renderTradeView();

    await buyShares(
      {
        TotalShares: 200,
        TotalEquity: 640,
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
        TotalEquity: 0,
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
