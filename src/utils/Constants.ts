import {
  LedgerType,
} from "trade-types";

export const DEBOUNCE_SHORT_MS = 500;
export const DEBOUNCE_MEDIUM_MS = 1000;
export const DEBOUNCE_LONG_MS = 2000;
export const TRADE_DATE_FORMAT = "[m]MM[d]DD[y]YYYY";
export const URL_DATE_FORMAT = "'m'MM'd'dd'y'y";
export const IEX_DATE_FORMAT = "y-MM-dd";
export const TRADE_DATE_OUTPUTS = "[m]MM[d]DD[y]YYYY";

export const DEFAULT_ERROR_MESSAGE = "There was a problem, please try again.";

export const FETCH_ERROR_MESSAGE =
  "There was a problem attempting to load trading information for the stock you requested.";

export const DATE_ERROR_MESSAGE =
  "There was a problem attempting to parse the date you requested.";

export const TICKER_ERROR_MESSAGE =
  "There was a problem attempting to parse the ticker you requested.";

export const SLIDER_TICK_COUNT = 4;

export const TICKER_INPUT_PLACERHOLDER = "Search for company by name or ticker...";

export enum CombinedBodyState {
  Extending = "extending",
  Retracting = "retracting",
}

export const PRESENT_HOLDINGS_STATE_KEY = "presentHoldings";
export const PRESENT_LEDGERS_STATE_KEY = "presentLedgers";
export const PRESENT_PRICES_STATE_KEY = "presentPrices";

export const HISTORICAL_HOLDINGS_STATE_KEY = "historicalHoldings";
export const HISTORICAL_LEDGERS_STATE_KEY = "historicalLedgers";
export const HISTORICAL_PRICES_STATE_KEY = "historicalPrices";

export const PRESENT_PRICE_SELECTOR_KEY = "presentPrice";
export const PRESENT_LEDGER_SELECTOR_KEY = "presentLedger";
export const PRESENT_HOLDING_SELECTOR_KEY = "presentHolding";

export const DEFAULT_LEDGER: LedgerType = {
  balance: 10000,
  amounts: {
    invested: 0,
    shorted: 0,
    holding: 0,
  },
  changes: {
    amount: {
      values: 0,
    },
    balance: {
      percent: 0,
      dollars: 0,
    },
    date: {
      days: 0,
    },
    price: {
      dollars: 0,
    },
  },
  returns: {
    invested: 0,
    percent: 0,
    dollars: 0,
  },
};

export const LOGGER_SEPERATOR = "·";
