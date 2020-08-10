import { renderWithBaseUI } from "./renderWithBaseUI";
import { renderWithRouter } from "./renderWithRouter";

export const renderWithBoilerplate = (
  ui,
  path = "/",
  route = "/",
) =>
{
  return renderWithBaseUI(renderWithRouter(
    ui,
    path,
    route,
  ));
};
