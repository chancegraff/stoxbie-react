import {
  screen,
} from "@testing-library/react";

const BuyButton = () =>
{
  return screen.getByText(
    "Buy",
  );
};

export default BuyButton;
