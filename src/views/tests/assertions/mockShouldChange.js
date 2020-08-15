const mockShouldChange = (
  mockFunction,
  mockArguments,
) =>
{
  return expect(
    mockFunction,
  ).toBeCalledWith(
    ...mockArguments,
  );
};

export default mockShouldChange;
