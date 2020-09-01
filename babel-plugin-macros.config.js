const getStyledComponents = (
  production,
) =>
{
  return {
    fileName: !production,
    displayName: !production,
    ssr: false,
    minify: production,
    pure: production,
  };
};

const getExports = () =>
{
  const production = (
    process.env.NODE_ENV === "production"
  );

  const styledComponents = getStyledComponents(
    production,
  );

  return {
    styledComponents,
  };
};

module.exports = getExports();
