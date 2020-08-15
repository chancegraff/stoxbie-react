import {
  fireEvent,
} from "@testing-library/react";

import {
  BuyButton,
} from "./components";

const clickBuy = () =>
{
  fireEvent.click(
    BuyButton(),
  );
};

export default clickBuy;
