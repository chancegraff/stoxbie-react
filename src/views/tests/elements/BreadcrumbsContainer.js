import {
  screen,
} from "@testing-library/react";

const BreadcrumbsContainer = () =>
{
  return screen.getByTestId(
    "breadcrumbs",
  );
};

export default BreadcrumbsContainer;
