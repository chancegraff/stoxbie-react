import {
  DateFormats, formatParsedDate,
} from "utils/Utilities";

import {
  componentShouldRender,
} from "./assertions";
import calculateTrade from "./calculateTrade";
import {
  TimeControlDate,
} from "./components";
import {
  clickContinue,
} from "./events";
import {
  dayOnePrice,
  dayTwoPrice,
} from "./prices";
import {
  renderView,
} from "./render";
import {
  shouldBuyShares,
} from "./shouldBuyShares";
import {
  shouldSellShares,
} from "./shouldSellShares";

const dayOneTrade = calculateTrade(
  dayOnePrice.close,
  200,
);
const dayTwoTrade = calculateTrade(
  dayTwoPrice.close,
  200,
  dayOneTrade,
);

it(
  "conducts a simple trade",
  async () =>
  {
    renderView();

    await shouldBuyShares(
      dayOneTrade,
      1,
    );

    clickContinue();

    await shouldSellShares(
      dayTwoTrade,
      1,
    );
  },
);
