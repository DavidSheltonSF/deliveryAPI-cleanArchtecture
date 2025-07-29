module.exports = {
  roots: ['<rootDir>/src'],
  // Coleção de caminhos que serão acompanhados pelo Jest
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/*-ports.ts',
    '!**/ports/**',
    '!**/src/**',
    '!**/config/**',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',

  // Permite o test de arquivos TypeScript
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};