import {
  addBusinessDays,
} from "date-fns";

import {
  componentShouldRender,
} from "utils/tests/Assertions";
import {
  TimeControlDate,
} from "utils/tests/Components";
import {
  clickContinue,
} from "utils/tests/Events";
import {
  getPriceRange,
  tradeViewStartDate,
} from "utils/tests/Helpers";
import {
  renderTradeView,
} from "utils/tests/Renderers";
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
  () =>
  {
    renderTradeView();

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
