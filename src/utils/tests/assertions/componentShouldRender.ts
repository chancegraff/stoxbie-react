export const componentShouldRender = (
  component: any,
) =>
{
  return expect(
    component,
  ).toBeInTheDocument();
};

export const componentsShouldRender = (
  components: Array<any>,
) =>
{
  return components.map(
    (
      component,
    ) =>
    {
      return componentShouldRender(
        component,
      );
    },
  );
};
