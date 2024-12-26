const { Sequelize } = require('sequelize');

const { env, loadEnvFile } = require('node:process');

if (env.NODE_ENV !== 'production') {
    process.loadEnvFile('./.env');

    const db = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
        host: env.DB_HOST,
        dialect: 'postgres',
        port: env.DB_PORT || 5432,
        schema: 'public',
        dialectOptions: {
            ssl: {
                require: true, // Forzar uso de SSL
                rejectUnauthorized: false, // Aceptar certificados auto-firmados
            },
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        logging: false, // Desactiva logs para mantener consola limpia (puedes habilitarlo si necesitas depuración)
    });
    module.exports = db;
} else {
    const db = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            dialect: 'postgres',
            port: process.env.DB_PORT || 5432,
            schema: 'public',
            dialectOptions: {
                ssl: {
                    require: true, // Forzar uso de SSL
                    rejectUnauthorized: true, // Aceptar certificados auto-firmados
                },
            },
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
            logging: false, // Desactiva logs para mantener consola limpia (puedes habilitarlo si necesitas depuración)
        }
    );
    module.exports = db;
}
