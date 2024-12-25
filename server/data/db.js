const { Sequelize} = require('sequelize');

const { env, loadEnvFile} = require ('node:process')

if (env.NODE_ENV !== 'production') {
  process.loadEnvFile("./.env")
}




const db = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD,  {
        host: env.DB_HOST,
        dialect: 'postgres',
        port: env.DB_PORT || 5432,
        schema: 'public'

    });


module.exports = db;
