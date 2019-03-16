export const environment = {
    production: false,
    connectionURI: 'mongodb://localhost:27017/example',
    tokenSecret: process.env.TOKEN_SECRET || 'muHQgMlJF5grVBqbX2yZfPnslhiEONZeR7pbLeSNAv3jzJYJ1YQ6mNH3tZpxrxA',
    port: process.env.LISTEN_PORT || 3001
};
