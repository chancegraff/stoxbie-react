declare module "trade-types" {
  /**
   * Ledger
   */
  declare type AmountsType = {
    present: number;
    historical: number;
    holding: number;
  };

  declare type ChangesType = {
    amount: {
      values: number;
    };
    balance: {
      percent: number;
      dollars: number;
    };
    date: {
      days: number;
    };
    price: {
      dollars: number;
    };
  };

  declare type ReturnsType = {
    percent: number;
    dollars: number;
  };

  declare type LedgerType = {
    balance: number;
    amounts: AmountsType;
    changes: ChangesType;
    returns: ReturnsType;
  };

  /**
   * Holding
   */
  declare type DirectionType = -1 | 1;

  declare type OrderType = {
    amount: number;
    balance: number;
    date: Date;
    direction: DirectionType;
    price: number;
  };

  declare type PresentOrderType = Order;

  declare type HistoricalOrderType = Order;

  declare type OrdersType = {
    present: PresentOrderType;
    historical: HistoricalOrderType;
  };

  declare type HoldingType = {
    ticker: string;
    orders: OrdersType;
    changes: ChangesType;
  };

  declare type PresentHoldingType = Omit<HoldingType, "changes" | "orders"> & {
    orders: Omit<OrdersType, "historical">;
  };

  declare type UnfinishedHistoricalHoldingType = Omit<HoldingType, "changes">;

  declare type HistoricalHoldingType = HoldingType;
}
