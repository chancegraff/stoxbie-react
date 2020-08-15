import {
  componentShouldRender,
} from "./componentShouldRender";

const componentsShouldRender = (
  components,
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

export default componentsShouldRender;
