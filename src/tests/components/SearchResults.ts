import {
  screen,
} from "@testing-library/react";

export const SearchResults = () =>
{
  return screen.getAllByTestId(
    "searchResult",
  );
};
