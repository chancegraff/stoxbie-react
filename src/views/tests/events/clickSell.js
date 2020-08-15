import {
  fireEvent,
} from "@testing-library/react";

import SellButton from "views/tests/elements/SellButton";

const clickSell = () =>
{
  fireEvent.click(
    SellButton(),
  );
};

export default clickSell;
