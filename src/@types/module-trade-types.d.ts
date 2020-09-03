declare module "trade-types" {
  declare type HistoricalTradeBase = {
    ticker: string;
  };

  declare type HistoricalTradeOpen = {
    openPrice: number;
    openCount: number;
    openBalance: number;
    openDate: Date;
    openDirection: -1 | 1;
  };

  declare type HistoricalTradeClose = {
    closePrice: number;
    closeCount: number;
    closeBalance: number;
    closeDate: Date;
    closeDirection: -1 | 1;
  };

  declare type HistoricalTradeChange = {
    changePrice: number;
    changePercent: number;
    changeBalance: number;
  }

  declare type HistoricalLedger = {
    totalBalance: number;
    totalReturns: number;
    totalChange: number;
    totalCount: number;
  }

  declare type HistoricalTrade = HistoricalTradeBase & Partial<HistoricalTradeOpen & HistoricalTradeClose & HistoricalTradeChange>;
  declare type HistoricalTradeStarted = HistoricalTradeBase & HistoricalTradeOpen & Partial<HistoricalTradeClose & HistoricalTradeChange>;
  declare type HistoricalTradeFinished = HistoricalTradeBase & HistoricalTradeOpen & HistoricalTradeClose & HistoricalTradeChange;
}
