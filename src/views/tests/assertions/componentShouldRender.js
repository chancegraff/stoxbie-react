const componentShouldRender = (
  component,
) =>
{
  return expect(
    component,
  ).toBeInTheDocument();
};

export default componentShouldRender;
