import {
  DateFormats,
  formatParsedDate,
} from "utils/Utilities";

import {
  componentShouldRender,
} from "./helpers/assertions";
import {
  TimeControlDate,
} from "./helpers/components";
import {
  clickContinue,
} from "./helpers/events";
import {
  dayOnePrice,
  dayTwoPrice,
} from "./helpers/prices";
import {
  renderTradeView,
} from "./helpers/render";

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
