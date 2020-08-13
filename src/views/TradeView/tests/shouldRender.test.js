import {
  formatCurrency,
} from "utils/Utilities";

import {
  componentShouldRender,
} from "./assertions";
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
} from "./components";
import {
  dayOneBalance,
} from "./constants";
import {
  dayOnePrice,
} from "./prices";
import {
  renderView,
} from "./render";

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
