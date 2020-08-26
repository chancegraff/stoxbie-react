import "iex-cloud";

declare module "iex-cloud" {
  declare type HistoricalPrice = {
    readonly symbol?: string;
    /** Formatted as YYYY-MM-DD */
    readonly date: string;
    /** Adjusted data for historical dates. Split adjusted only. */
    readonly high: number;
    /** Adjusted data for historical dates. Split adjusted only. */
    readonly low: number;
    /** Adjusted data for historical dates. Split adjusted only. */
    readonly volume: number;
    /** Adjusted data for historical dates. Split adjusted only. */
    readonly open: number;
    /** Adjusted data for historical dates. Split adjusted only. */
    readonly close: number;
    /** Unadjusted data for historical dates. */
    readonly uHigh: number;
    /** Unadjusted data for historical dates. */
    readonly uLow: number;
    /** Unadjusted data for historical dates. */
    readonly uVolume: number;
    /** Unadjusted data for historical dates. */
    readonly uOpen: number;
    /** Unadjusted data for historical dates. */
    readonly uClose: number;
    /** Percent change of each interval relative to first value. Useful for comparing multiple stocks. */
    readonly changeOverTime: number;
    /** A human readable format of the date depending on the range. */
    readonly label: string;
    /** Change from previous trading day. */
    readonly change: number;
    /** Change percent from previous trading day. */
    readonly changePercent: number;
  }
}
