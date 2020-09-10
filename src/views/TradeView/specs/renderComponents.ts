import {
  componentsShouldRender,
  pageShouldLoad,
} from "tests/Assertions";
import {
  BreadcrumbsContainer,
  BreadcrumbsTicker,
  ContinueButton,
  LineChart,
  OrderButton,
  TableFooterDollarBalance,
  TableHeaderClose,
  TableHeaderEquity,
  TableHeaderOpen,
  TableHeaderShares,
  TradeSlider,
} from "tests/Components";
import {
  getPrice,
  tradeViewStartDate,
} from "tests/Helpers";
import {
  renderTradeView,
} from "tests/Renderers";
import {
  formatCurrency,
} from "utils/Utilities";

const dayOnePrice = getPrice(
  tradeViewStartDate,
);

it(
  "renders trade view",
  async () =>
  {
    renderTradeView();

    await pageShouldLoad();

    componentsShouldRender(
      [
        BreadcrumbsContainer(),
        BreadcrumbsTicker(
          dayOnePrice.symbol,
        ),
        LineChart(),
        ContinueButton(),
        TradeSlider(),
        OrderButton(),
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
