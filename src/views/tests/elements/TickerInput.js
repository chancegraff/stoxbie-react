import {
  screen,
} from "@testing-library/react";

const TickerInput = () =>
{
  return screen.getByRole(
    "search",
  );
};

export default TickerInput;
