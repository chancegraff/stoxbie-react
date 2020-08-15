import {
  formatCurrency,
} from "utils/Utilities";

import componentsShouldRender from "./assertions/componentsShouldRender";
import BreadcrumbsContainer from "./elements/BreadcrumbsContainer";
import BreadcrumbsTicker from "./elements/BreadcrumbsTicker";
import BuyButton from "./elements/BuyButton";
import ContinueButton from "./elements/ContinueButton";
import LineChart from "./elements/LineChart";
import SellButton from "./elements/SellButton";
import TableFooterDollarBalance from "./elements/TableFooterDollarBalance";
import TableHeaderChangePercent from "./elements/TableHeaderChangePercent";
import TableHeaderClose from "./elements/TableHeaderClose";
import TableHeaderDollarBalance from "./elements/TableHeaderDollarBalance";
import TableHeaderOpen from "./elements/TableHeaderOpen";
import TradeSlider from "./elements/TradeSlider";
import {
  dayOneBalance,
} from "./helpers/constants";
import {
  dayOnePrice,
} from "./helpers/prices";
import {
  renderTradeView,
} from "./helpers/render";

it(
  "renders trade view",
  () =>
  {
    renderTradeView();

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
