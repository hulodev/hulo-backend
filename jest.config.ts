import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['lcov', 'text-summary'],
  collectCoverageFrom: [
      'src/**/*.ts',
      '!src/main/main.ts',
      '!src/main/server.ts',
      '!src/main/router.ts',
      '!src/main/utils/logger.ts',
      '!src/main/dummy-person/**/*.ts' // todo: temporary exclusion of dummy-person folder. uncomment to test

  ], // add files that we want to exclude from testing by adding !.
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  }, // coverage settings
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  setupFiles: ['./setEnvVars.js'], // env test variables
};

export default config;
