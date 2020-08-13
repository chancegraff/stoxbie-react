const CreateRange = () =>
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

global.document.createRange = CreateRange;

export default CreateRange;
