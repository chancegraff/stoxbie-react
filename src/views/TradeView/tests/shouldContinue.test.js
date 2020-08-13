import {
  DateFormats,
  formatParsedDate,
} from "utils/Utilities";

import {
  componentShouldRender,
} from "./assertions";
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

it(
  "continues forward in time",
  () =>
  {
    renderView();

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
