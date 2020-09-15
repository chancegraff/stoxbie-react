import {
  ExitButtons,
  TablePresentBody,
} from "tests/Components";
import {
  clickExit,
} from "tests/events/clickExit";

export const exitShares = (
  presentRow?: HTMLElement,
) =>
{
  let buttonContainer = presentRow;

  if (!buttonContainer)
  {
    buttonContainer = TablePresentBody();
  }

  const [
    exitButton,
  ] = ExitButtons(
    buttonContainer,
  );

  clickExit(
    exitButton,
  );
};
