import 'dotenv/config';
// import dotenv from 'dotenv';
import Sequelize from 'sequelize';
// dotenv.config();

const sequelize = new Sequelize(process.env.DB_DBNAME, process.env.DB_USERNAME, process.env.DB_PASSWWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export { sequelize, testConnection };