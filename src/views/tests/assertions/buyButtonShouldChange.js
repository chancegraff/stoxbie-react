import BuyButtonCheck from "views/tests/elements/BuyButtonCheck";

const buyButtonShouldChange = (
  active,
) =>
{
  const assertion = expect(
    BuyButtonCheck(),
  );

  return active
    ? assertion.not.toBeNull()
    : assertion.toBeNull();
};

export default buyButtonShouldChange;
