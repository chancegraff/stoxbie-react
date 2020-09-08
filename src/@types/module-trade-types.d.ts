declare module "trade-types" {
  /**
   * Ledger
   */
  declare type Amounts = {
    present: number;
    historical: number;
    holding: number;
  };

  declare type Changes = {
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

  declare type Returns = {
    percent: number;
    dollars: number;
  };

  declare type Ledger = {
    balance: number;
    amounts: Amounts;
    changes: Changes;
    returns: Returns;
  };

  /**
   * Holding
   */
  export enum Directions {
    Buy = 1,
    Sell = -1,
  }

  declare type Order = {
    amount: number;
    balance: number;
    date: Date;
    direction: Directions;
    price: number;
  };

  declare type PresentOrder = Order;

  declare type HistoricalOrder = Order;

  declare type Orders = {
    present: PresentOrder;
    historical: HistoricalOrder;
  };

  declare type Holding = {
    ticker: string;
    orders: Orders;
    change: Changes;
  };

  declare type PresentHolding = Omit<Holding, "historical" | "change">;

  declare type HistoricalHolding = Holding;
}
