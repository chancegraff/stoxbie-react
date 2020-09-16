import {
  within,
} from "@testing-library/react";

import {
  PriceDateContainer,
} from "./PriceDateContainer";

export const PriceDateText = (
  date: string,
) =>
{
  return within(
    PriceDateContainer(),
  ).getByText(
    `Today is ${date}`,
  );
};
