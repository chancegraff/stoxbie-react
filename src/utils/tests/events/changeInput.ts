import {
  fireEvent,
} from "@testing-library/react";

export const changeInput = (
  input: any,
  value: string,
) =>
{
  fireEvent.change(
    input,
    {
      target: {
        value,
      },
    },
  );
};
