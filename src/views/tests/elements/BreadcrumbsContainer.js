import {
  screen,
} from "@testing-library/react";

const BreadcrumbsContainer = () =>
{
  return screen.getByLabelText(
    "Breadcrumbs navigation",
  );
};

export default BreadcrumbsContainer;
