const { Sequelize} = require('sequelize');

const { env, loadEnvFile} = require ('node:process')
process.loadEnvFile("./.env")

const db = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD,  {
        host: 'localhost',
        dialect: 'postgres',
        port: 5432,
        schema: 'public'
    
    });


module.exports = db;
