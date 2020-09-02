import {
  componentsShouldRender,
} from "utils/tests/Assertions";
import {
  BreadcrumbsContainer,
  BreadcrumbsTicker,
  BuyButton,
  ContinueButton,
  LineChart,
  SellButton,
  TableFooterDollarBalance,
  TableHeaderClose,
  TableHeaderEquity,
  TableHeaderOpen,
  TableHeaderShares,
  TradeSlider,
} from "utils/tests/Components";
import {
  getPrice,
  tradeViewStartDate,
} from "utils/tests/Helpers";
import {
  renderTradeView,
} from "utils/tests/Renderers";
import {
  formatCurrency,
} from "utils/Utilities";

const dayOnePrice = getPrice(
  tradeViewStartDate,
);

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
