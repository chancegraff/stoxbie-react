import {
  addBusinessDays,
} from "date-fns";

import {
  DateFormats,
  formatParsedDate,
} from "utils/Utilities";

import componentShouldRender from "./assertions/componentShouldRender";
import TimeControlDate from "./elements/TimeControlDate";
import clickContinue from "./events/clickContinue";
import {
  getPriceRange,
  tradeViewStartDate,
} from "./helpers/prices";
import render from "./render/TradeView";

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
    render();

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
