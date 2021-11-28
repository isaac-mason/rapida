module.exports = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleFileExtensions: ['js', 'ts'],
  testPathIgnorePatterns: ['node_modules', 'lib'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.(js)$': 'babel-jest',
  },
  collectCoverage: true,
  coverageDirectory: './coverage/',
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
};
