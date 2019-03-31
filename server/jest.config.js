module.exports = {
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json'
        }
    },
    moduleFileExtensions: [
        'ts',
        'js'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    testMatch: [
        '**/test/**/*.test.(ts|js)'
    ],
    testEnvironment: 'node',
    moduleNameMapper: {
        "@environment": "<rootDir>/src/environments/environment.ts",
        "@controllers/(.*)": "<rootDir>/src/app/controller/$1",
        "@services/(.*)": "<rootDir>/src/app/services/$1",
        "@models/(.*)": "<rootDir>/src/app/models/$1",
        "@schemas/(.*)": "<rootDir>/src/app/schemas/$1",
        "@utils/(.*)": "<rootDir>/src/app/utils/$1"
    }
};