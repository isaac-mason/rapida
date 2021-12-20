/* eslint-disable no-undef */
jest.mock('@rapidajs/rapida-physics', () => ({
  __esModule: true, // this property makes it work
  default: 'mockedDefaultExport',
  namedExport: jest.fn(),
}));
