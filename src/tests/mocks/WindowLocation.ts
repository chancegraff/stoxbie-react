const location = {
  reload: jest.fn(),
};

delete global.location;

global.location = location;

export default location;
