import {
  screen,
} from "@testing-library/react";

export const OrderButton = () =>
{
  return screen.getByText(
    "Order",
  );
};
