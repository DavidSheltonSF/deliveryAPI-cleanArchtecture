module.exports = {
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  // Coleção de caminhos que serão acompanhados pelo Jest
  collectCoverageFrom: [
    '<rootDir>/tests/**/*.ts',
    '!<rootDir>/tests/main/**',
    '!<rootDir>/tests/**/*-ports.ts',
    '!**/ports/**',
    '!**/tests/**',
    '!**/config/**'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',

  // Permite o test de arquivos TypeScript
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
}