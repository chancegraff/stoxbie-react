import {
  screen,
} from "@testing-library/react";

const BreadcrumbsTicker = (
  ticker,
) =>
{
  return screen.getByText(
    ticker,
  );
};

export default BreadcrumbsTicker;
