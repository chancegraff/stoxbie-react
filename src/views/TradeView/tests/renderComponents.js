import {
  formatCurrency,
} from "utils/Utilities";

import {
  componentsShouldRender,
} from "./helpers/assertions";
import {
  BreadcrumbsContainer,
  BreadcrumbsTicker,
  BuyButton,
  ContinueButton,
  LineChart,
  SellButton,
  TableFooterDollarBalance,
  TableHeaderChangePercent,
  TableHeaderClose,
  TableHeaderDollarBalance,
  TableHeaderOpen,
  TradeSlider,
} from "./helpers/components";
import {
  dayOneBalance,
} from "./helpers/constants";
import {
  dayOnePrice,
} from "./helpers/prices";
import {
  renderView,
} from "./helpers/render";

it(
  "renders trade view",
  () =>
  {
    renderView();

    componentsShouldRender(
      [
        BreadcrumbsContainer(),
        BreadcrumbsTicker(
          dayOnePrice.symbol,
        ),
        LineChart(),
        ContinueButton(),
        TradeSlider(),
        BuyButton(),
        SellButton(),
        TableHeaderOpen(),
        TableHeaderClose(),
        TableHeaderChangePercent(),
        TableHeaderDollarBalance(),
        TableFooterDollarBalance(
          formatCurrency(
            dayOneBalance,
          ),
        ),
      ],
    );
  },
);
