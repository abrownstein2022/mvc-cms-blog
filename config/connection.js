const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      // dialectOptions: {
      //   socketPath: 'MySQL',
      //   debug: true
      // }
    }
  );

  sequelize.authenticate()
    .then(()=>{
      console.log('Database connection authenticated...');
    })
    .catch(err => {
      console.log('Database authentication error:', err);
    });
}
// npm i --save-dev <package> (devDependancy)
// npm i -D <package> (devDependancy)

module.exports = sequelize;
