module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};