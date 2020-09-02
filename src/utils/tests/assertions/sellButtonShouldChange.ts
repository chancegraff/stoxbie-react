import {
  SellButtonCheck,
} from "utils/tests/Components";

export const sellButtonShouldChange = (
  active: boolean,
) =>
{
  const assertion = expect(
    SellButtonCheck(),
  );

  return active
    ? assertion.not.toBeNull()
    : assertion.toBeNull();
};
