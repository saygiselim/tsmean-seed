export const environment = {
    production: process.env.NODE_ENV === 'production',
    connectionURI: process.env.DB_URI || 'mongodb://localhost:27017/example',
    tokenSecret: process.env.TOKEN_SECRET || 'muHQgMlJF5grVBqbX2yZfPnslhiEONZeR7pbLeSNAv3jzJYJ1YQ6mNH3tZpxrxA',
    port: process.env.LISTEN_PORT || 3001
};
