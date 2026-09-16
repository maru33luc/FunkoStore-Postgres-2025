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
            max: 5,         // Límite seguro por proceso para no agotar el pooler (límite total: 15)
            min: 0,         // Liberar todas las conexiones inactivas
            acquire: 30000, // Tiempo máximo de espera para obtener una conexión
            idle: 5000,     // Liberar conexión inactiva tras 5 segundos
            evict: 1000,    // Evaluar conexiones inactivas cada segundo
        },
        logging: false, // Desactiva logs para mantener consola limpia
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
            ssl: true,  // Habilitar SSL
            dialectOptions: {
                ssl: {
                    require: true, // Forzar uso de SSL
                    rejectUnauthorized: false, // Aceptar certificados auto-firmados
                },
            },
            pool: {
                max: 5,         // Límite seguro por proceso para no agotar el pooler
                min: 0,         // Liberar todas las conexiones inactivas
                acquire: 30000,
                idle: 5000,
                evict: 1000,
            },
            logging: false,
        }
    );
    module.exports = db;
}
