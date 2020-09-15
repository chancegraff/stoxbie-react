import {
  DirectionType,
} from "trade-types";

export const Direction = (
  holdingAmount: number,
): DirectionType =>
{
  return holdingAmount / Math.abs(
    holdingAmount,
  ) as DirectionType;
};

export const OppositeDirection = (
  direction: DirectionType,
): DirectionType =>
{
  return direction * -1 as DirectionType;
};

export const Amount = (
  amount: number,
): number =>
{
  return Math.abs(
    amount,
  );
};

export const Balance = (
  amount: number,
  dollars: number,
): number =>
{
  return Amount(
    amount,
  ) * dollars;
};
