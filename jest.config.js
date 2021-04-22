module.exports = {
  moduleNameMapper: {
    "^@/clients(.*)$": "<rootDir>/src/clients$1",
    "^@/components(.*)$": "<rootDir>/src/components$1",
    "^@/hooks(.*)$": "<rootDir>/src/hooks$1",
    "^@/lib(.*)$": "<rootDir>/src/lib$1",
    "^@/models(.*)$": "<rootDir>/src/models$1",
    "^@/pages(.*)$": "<rootDir>/src/pages$1",
    "^@/services(.*)$": "<rootDir>/src/services$1",
    "^@/styles(.*)$": "<rootDir>/src/styles$1",
    "^@/utils(.*)$": "<rootDir>/src/utils$1",
  },
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/.next/",
    "<rootDir>/.k8s/",
  ],
}
