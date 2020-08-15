import {
  screen,
} from "@testing-library/react";

const TickerInput = () =>
{
  return screen.getByRole(
    "combobox",
  );
};

export default TickerInput;
