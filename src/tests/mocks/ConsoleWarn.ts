const Warn = () =>
{
  return undefined;
};

global.console.warn = Warn;
global.console.error = Warn;

export default Warn;
