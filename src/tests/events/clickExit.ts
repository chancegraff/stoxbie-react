import userEvent from "@testing-library/user-event";

export const clickExit = (
  exit: HTMLElement,
) =>
{
  userEvent.click(
    exit,
  );
};
