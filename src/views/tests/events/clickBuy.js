import {
  fireEvent,
} from "@testing-library/react";

import BuyButton from "views/tests/elements/BuyButton";

const clickBuy = () =>
{
  fireEvent.click(
    BuyButton(),
  );
};

export default clickBuy;
