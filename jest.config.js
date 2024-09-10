module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/src/setup.jest.ts"],
  moduleNameMapper: {
    "^@shared/(.*)$": "<rootDir>/src/app/shared/$1",
    "^@core/(.*)$": "<rootDir>/src/app/core/$1",
    "^@models/(.*)$": "<rootDir>/src/app/shared/models/$1",
    "^@mocks/(.*)$": "<rootDir>/src/mocks/$1",
    "^@environments/(.*)$": "<rootDir>/src/environments/$1",
  },
};
