jest.mock('@rapidajs/rapida-physics', () => ({
  __esModule: true, // this property makes it work
  default: 'mockedDefaultExport',
  namedExport: jest.fn(),
}));

jest.mock('three-stdlib/controls/OrbitControls', () => ({
  __esModule: true, // this property makes it work
  default: 'mockedDefaultExport',
  namedExport: jest.fn(),
}));

jest.mock('three-stdlib/controls/PointerLockControls', () => ({
  __esModule: true, // this property makes it work
  default: 'mockedDefaultExport',
  namedExport: jest.fn(),
}));
