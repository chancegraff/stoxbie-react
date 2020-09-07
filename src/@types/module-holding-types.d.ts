declare module "holding-types" {
  declare type ValueType<K extends string, T extends unknown> = {
    [key in K]: T;
  }

  declare type DollarType = ValueType<"dollars", number>;

  declare type AmountType = ValueType<"values", number>;

  declare type DateType = ValueType<"days", number>;

  declare type PercentType = {
    percent: number;
  }

  declare type DirectionType = -1 | 1;

  declare enum Directions {
    Buy = 1,
    Sell = -1,
  }

  declare const Direction = (
    holdingAmount: number,
  ): DirectionType =>
  {
    return holdingAmount / Math.abs(
      holdingAmount,
    );
  };

  declare const OppositeDirection = (
    direction: DirectionType,
  ): DirectionType =>
  {
    return direction * -1;
  };

  declare const Amount = (
    amount: number,
  ): number =>
  {
    return Math.abs(
      amount,
    );
  };

  declare const Balance = (
    amount: number,
    dollars: number,
  ): number =>
  {
    return Amount(
      amount,
    ) * dollars;
  };

  declare type Order = {
    amount: number;
    balance: number;
    date: Date;
    direction: Directions;
    price: number;
  }

  declare type OpenOrder = Order;

  declare type CloseOrder = Order;

  declare type Change = {
    amount: PercentType & AmountType;
    balance: PercentType & DollarType;
    date: PercentType & DateType;
    price: PercentType & DollarType;
  };

  declare type Holding = {
    ticker: string;
    open: OpenOrder;
    close: CloseOrder;
    change: Change;
  }

  declare type OpenedHolding = Omit<Holding, "close" | "change">;

  declare type ClosedHolding = Holding;

  declare type Returns = PercentType & DollarType;

  declare type Amounts = {
    opened: number;
    closed: number;
    holding: number;
  }

  declare type Ledger = {
    balance: number;
    amounts: Amounts;
    change: Change;
    returns: Returns;
  };

  declare const DefaultLedger: Ledger = {
    balance: 10000,
    amounts: {
      opened: 0,
      closed: 0,
      holding: 0,
    },
    change: {
      amount: {
        percent: 0,
        values: 0,
      },
      balance: {
        percent: 0,
        dollars: 0,
      },
      date: {
        percent: 0,
        days: 0,
      },
      price: {
        percent: 0,
        dollars: 0,
      },
    },
    returns: {
      percent: 0,
      dollars: 0,
    },
  };
}
