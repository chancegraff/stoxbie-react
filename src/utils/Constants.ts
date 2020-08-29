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

export const SLIDER_TICK_COUNT = 7;

export const TICKER_INPUT_PLACERHOLDER = "Search for company by name or ticker...";

export enum CombinedBodyState {
  Extending = "extending",
  Retracting = "retracting",
}
