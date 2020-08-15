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
  startDate,
} from "./helpers/constants";
import {
  getPriceRange,
} from "./helpers/prices";
import {
  renderTradeView,
} from "./helpers/render";

const [
  dayOnePrice,
  dayTwoPrice,
] = getPriceRange(
  startDate,
  addBusinessDays(
    startDate,
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
          DateFormats.IEX,
          DateFormats.Full,
        ),
      ),
    );

    clickContinue();

    componentShouldRender(
      TimeControlDate(
        formatParsedDate(
          dayTwoPrice.date,
          DateFormats.IEX,
          DateFormats.Full,
        ),
      ),
    );
  },
);
