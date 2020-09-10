import {
  addBusinessDays,
} from "date-fns";

import {
  componentShouldRender,
  pageShouldLoad,
} from "tests/Assertions";
import {
  TimeControlDate,
} from "tests/Components";
import {
  clickContinue,
} from "tests/Events";
import {
  getPriceRange,
  tradeViewStartDate,
} from "tests/Helpers";
import {
  renderTradeView,
} from "tests/Renderers";
import {
  DateFormats,
  formatParsedDate,
} from "utils/Utilities";

const [
  dayOnePrice,
  dayTwoPrice,
] = getPriceRange(
  tradeViewStartDate,
  addBusinessDays(
    tradeViewStartDate,
    1,
  ),
);

it(
  "continues forward in time",
  async () =>
  {
    renderTradeView();

    await pageShouldLoad();

    componentShouldRender(
      TimeControlDate(
        formatParsedDate(
          dayOnePrice.date,
          DateFormats.Iex,
          DateFormats.Full,
        ),
      ),
    );

    clickContinue();

    componentShouldRender(
      TimeControlDate(
        formatParsedDate(
          dayTwoPrice.date,
          DateFormats.Iex,
          DateFormats.Full,
        ),
      ),
    );
  },
);
