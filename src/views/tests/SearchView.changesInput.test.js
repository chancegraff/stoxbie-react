import mockShouldChange from "views/tests/assertions/mockShouldChange";

import TickerInput from "./elements/TickerInput";
import changeInput from "./events/changeInput";
import {
  renderSearchView,
} from "./helpers/render";

const handleSearch = jest.fn();

it(
  "types into the input",
  () =>
  {
    renderSearchView(
      {
        handleSearch,
      },
    );

    changeInput(
      TickerInput(),
      "netflix",
    );

    mockShouldChange(
      handleSearch,
      [
        "netflix",
        expect.any(
          Function,
        ),
        expect.any(
          Function,
        ),
      ],
    );
  },
);
