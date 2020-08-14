import {
  formatCurrency,
} from "utils/Utilities";

import {
  componentShouldRender,
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

    componentShouldRender(
      BreadcrumbsContainer(),
    );

    componentShouldRender(
      BreadcrumbsTicker(
        dayOnePrice.symbol,
      ),
    );

    componentShouldRender(
      LineChart(),
    );

    componentShouldRender(
      ContinueButton(),
    );

    componentShouldRender(
      TradeSlider(),
    );

    componentShouldRender(
      BuyButton(),
    );

    componentShouldRender(
      SellButton(),
    );

    componentShouldRender(
      TableHeaderOpen(),
    );

    componentShouldRender(
      TableHeaderClose(),
    );

    componentShouldRender(
      TableHeaderChangePercent(),
    );

    componentShouldRender(
      TableHeaderDollarBalance(),
    );

    componentShouldRender(
      TableFooterDollarBalance(
        formatCurrency(
          dayOneBalance,
        ),
      ),
    );
  },
);
