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
import TableHeaderClose from "./elements/TableHeaderClose";
import TableHeaderEquity from "./elements/TableHeaderEquity";
import TableHeaderOpen from "./elements/TableHeaderOpen";
import TableHeaderShares from "./elements/TableHeaderShares";
import TradeSlider from "./elements/TradeSlider";
import {
  getPrice,
  tradeViewStartDate,
} from "./helpers/prices";
import render from "./render/TradeView";

const dayOnePrice = getPrice(
  tradeViewStartDate,
);

it(
  "renders trade view",
  () =>
  {
    render();

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
        TableHeaderShares(),
        TableHeaderOpen(),
        TableHeaderClose(),
        TableHeaderEquity(),
        TableFooterDollarBalance(
          formatCurrency(
            10000,
          ),
        ),
      ],
    );
  },
);
