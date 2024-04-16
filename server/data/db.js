const { Sequelize} = require('sequelize');
require('dotenv').config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    schema: 'public',
    ssl: true,  // Habilitar SSL
    dialectOptions: {
        ssl: {
            require: true,  // Requerir SSL
            rejectUnauthorized: false  // Deshabilitar la verificación del certificado (si es necesario)
        }
    }
});

module.exports = db;