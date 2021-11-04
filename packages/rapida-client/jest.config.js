module.exports = {
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  testPathIgnorePatterns: ['node_modules', 'lib'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '\\.[jt]sx?$': 'babel-jest',
  },
};
