declare module "holding-types" {
  declare type ValueType<K extends string, T extends unknown> = {
    [key in K]: T;
  }

  declare type ValueTypeKeys = "dollars" | "values" | "days";

  declare type DollarType = ValueType<"dollars", number>;

  declare type AmountType = ValueType<"values", number>;

  declare type DateType = ValueType<"days", number>;

  declare type PercentType = {
    percent?: number;
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

  declare type PresentOrderType = Order;

  declare type HistoricalOrderType = Order;

  declare type ChangeAmountType = PercentType & AmountType;
  declare type ChangeDollarType = PercentType & DollarType;
  declare type ChangeDateType = PercentType & DateType;
  declare type ChangeType = ChangeAmountType | ChangeDollarType | ChangeDateType;

  declare type Change = {
    amount: ChangeAmountType;
    balance: ChangeDollarType;
    date: ChangeDateType;
    price: ChangeDollarType;
  };

  declare type Holding = {
    ticker: string;
    present: PresentOrderType;
    historical: HistoricalOrderType;
    change: Change;
  }

  declare type PresentHoldingType = Omit<Holding, "historical" | "change">;

  declare type UnfinishedHistoricalHoldingType = Omit<Holding, "change">;

  declare type HistoricalHoldingType = Holding;

  declare type Returns = PercentType & DollarType;

  declare type Amounts = {
    present: number;
    historical: number;
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
      present: 0,
      historical: 0,
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
