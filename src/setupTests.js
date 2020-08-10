import ResizeObserver from "tests/mocks/ResizeObserver";

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

delete window.location;

window.location = { reload: jest.fn() };

// Mocking dependencies (in case we forget again)
// const getFirstAlbumTitle = require('./index');
// const axios = require('axios');

// jest.mock('axios');

// it('returns the title of the first album', async () => {
//   axios.get.mockResolvedValue({
//     data: [
//       {
//         userId: 1,
//         id: 1,
//         title: 'My First Album'
//       },
//       {
//         userId: 1,
//         id: 2,
//         title: 'Album: The Sequel'
//       }
//     ]
//   });

//   const title = await getFirstAlbumTitle();
//   expect(title).toEqual('My First Album');
// });
