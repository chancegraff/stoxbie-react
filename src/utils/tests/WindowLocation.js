const location = {
  reload: jest.fn(),
};

delete window.location;

window.location = location;

export default location;
