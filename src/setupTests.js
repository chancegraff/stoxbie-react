import "@testing-library/jest-dom/extend-expect";

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
