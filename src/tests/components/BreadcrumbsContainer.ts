import {
  screen,
} from "@testing-library/react";

export const BreadcrumbsContainer = () =>
{
  return screen.getByTestId(
    "breadcrumbs",
  );
};
