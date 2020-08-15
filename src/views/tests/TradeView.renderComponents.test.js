import {
  formatCurrency,
} from "utils/Utilities";

import componentsShouldRender from "./assertions/componentsShouldRender";
import BreadcrumbsContainer from "./components/BreadcrumbsContainer";
import BreadcrumbsTicker from "./components/BreadcrumbsTicker";
import BuyButton from "./components/BuyButton";
import ContinueButton from "./components/ContinueButton";
import LineChart from "./components/LineChart";
import SellButton from "./components/SellButton";
import TableFooterDollarBalance from "./components/TableFooterDollarBalance";
import TableHeaderChangePercent from "./components/TableHeaderChangePercent";
import TableHeaderClose from "./components/TableHeaderClose";
import TableHeaderDollarBalance from "./components/TableHeaderDollarBalance";
import TableHeaderOpen from "./components/TableHeaderOpen";
import TradeSlider from "./components/TradeSlider";
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
