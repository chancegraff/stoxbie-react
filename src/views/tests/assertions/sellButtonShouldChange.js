import SellButtonCheck from "views/tests/elements/SellButtonCheck";

const sellButtonShouldChange = (
  active,
) =>
{
  const assertion = expect(
    SellButtonCheck(),
  );

  return active
    ? assertion.not.toBeNull()
    : assertion.toBeNull();
};

export default sellButtonShouldChange;
