import {
  fireEvent,
} from "@testing-library/react";

const changeInput = (
  input,
  value,
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

export default changeInput;
