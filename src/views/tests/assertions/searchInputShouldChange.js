import TickerInput from "../elements/TickerInput";

const searchInputShouldChange = (
  value,
) =>
{
  return expect(
    TickerInput(),
  ).toHaveAttribute(
    "value",
    value,
  );
};

export default searchInputShouldChange;
