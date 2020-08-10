import "@testing-library/jest-dom/extend-expect";

import ResizeObserver from "tests/mocks/ResizeObserver";

global.document.createRange = () =>
{
  return {
    setStart: () =>
    {
      return undefined;
    },
    setEnd: () =>
    {
      return undefined;
    },
    commonAncestorContainer: {
      nodeName: "BODY",
      ownerDocument: document,
    },
  };
};

delete window.location;

window.location = { reload: jest.fn() };
