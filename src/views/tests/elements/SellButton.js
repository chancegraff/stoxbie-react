import {
  screen,
} from "@testing-library/react";

const SellButton = () =>
{
  return screen.getByText(
    "Sell",
  );
};

export default SellButton;
