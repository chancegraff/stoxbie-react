import {
  within,
} from "@testing-library/react";

import {
  BreadcrumbsContainer,
} from "tests/Components";

export const BreadcrumbsTicker = (
  ticker: string,
) =>
{
  return within(
    BreadcrumbsContainer(),
  ).getByText(
    ticker,
  );
};
