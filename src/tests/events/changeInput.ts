import userEvent from "@testing-library/user-event";

export const changeInput = (
  input: any,
  value: string,
) =>
{
  userEvent.type(
    input,
    value,
  );
};
