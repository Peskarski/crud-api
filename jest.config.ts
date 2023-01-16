export default {
  clearMocks: true,
  coverageProvider: 'v8',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  verbose: true,
  testMatch: [
    '**/tests/**/*.spec.ts',
  ],
};
