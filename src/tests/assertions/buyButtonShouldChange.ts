import {
  BuyButtonCheck,
} from "tests/Components";

export const buyButtonShouldChange = (
  active: boolean,
) =>
{
  const assertion = expect(
    BuyButtonCheck(),
  );

  return active
    ? assertion.not.toBeNull()
    : assertion.toBeNull();
};
