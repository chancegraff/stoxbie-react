import {
  addBusinessDays,
} from "date-fns";

import {
  componentShouldRender,
} from "utils/Assertions";
import {
  TimeControlDate,
} from "utils/Components";
import {
  clickContinue,
} from "utils/Events";
import {
  getPriceRange,
  tradeViewStartDate,
} from "utils/Helpers";
import {
  renderTradeView,
} from "utils/Renderers";
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
