// require('dotenv').config();

const { env, loadEnvFile } = require('node:process');

if (env.NODE_ENV !== 'production') {
    loadEnvFile('./.env');
}

module.exports = {
    "development": {

        "username": process.env.DB_USER || "postgres",
        "password": process.env.DB_PASSWORD ,
        "database": process.env.DB_NAME || "funkostore",
        "host": process.env.DB_HOST || "127.0.0.1",
        "dialect": "postgres",
        "port": process.env.DB_PORT || 5432,
        "schema": "public"
    },
    "test": {
        "username": process.env.DB_USER || "postgres",
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME || "funkostore",
        "host": process.env.DB_HOST || "127.0.0.1",
        "dialect": "postgres",
        "port": process.env.DB_PORT || 5432
    },
    "production": {
        "username": process.env.DB_USER || "postgres",
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME || "funkostore",
        "host": process.env.DB_HOST || "127.0.0.1",
        "dialect": "postgres",
        "port": process.env.DB_PORT || 5432
    }
}
