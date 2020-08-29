const isDev = (
  process.env.NODE_ENV !== "production" // eslint-disable-line no-process-env
);

module.exports = {
  styledComponents: {
    fileName: isDev,
    displayName: isDev,
  },
};
