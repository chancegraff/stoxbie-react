import {
  screen,
} from "@testing-library/react";

const ContinueButton = () =>
{
  return screen.getByText(
    "Continue",
  );
};

export default ContinueButton;
