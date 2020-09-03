export const mockShouldChange = (
  mockFunction: any,
  mockArguments: Array<any>,
) =>
{
  return expect(
    mockFunction,
  ).toBeCalledWith(
    ...mockArguments,
  );
};
