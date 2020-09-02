import {
  within,
} from "@testing-library/react";

import BreadcrumbsContainer from "./BreadcrumbsContainer";

const BuyButtonCheck = (
  ticker,
) =>
{
  return within(
    BreadcrumbsContainer(),
  ).getByText(
    ticker,
  );
};

export default BuyButtonCheck;
