const Sequelize = require('sequelize');
require('dotenv').config();
//import Sequelize from 'sequelize';
//import dotenv from 'dotenv'
//dotenv.config()


let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: '127.0.0.1',
      dialect: 'mysql',
      port: 3306,
      // disable the logs - lots of SQL statements
      logging: false,
    }
  );
}

module.exports = sequelize;
//export default sequelize