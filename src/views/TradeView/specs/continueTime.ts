import {
  addBusinessDays,
} from "date-fns";

import {
  componentShouldRender,
} from "tests/Assertions";
import {
  PriceDateText,
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
  () =>
  {
    renderTradeView();

    componentShouldRender(
      PriceDateText(
        formatParsedDate(
          dayOnePrice.date,
          DateFormats.Iex,
          DateFormats.Full,
        ),
      ),
    );

    clickContinue();

    componentShouldRender(
      PriceDateText(
        formatParsedDate(
          dayTwoPrice.date,
          DateFormats.Iex,
          DateFormats.Full,
        ),
      ),
    );
  },
);
