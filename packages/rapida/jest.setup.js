/* eslint-disable no-undef */
jest.mock('@rapidajs/cannon-worker', () => ({
  __esModule: true, // this property makes it work
  default: 'mockedDefaultExport',
  namedExport: jest.fn(),
}));
