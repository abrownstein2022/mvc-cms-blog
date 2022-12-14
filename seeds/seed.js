// const sequelize = require('../config/connection');
// const { Traveller, Location, Trip } = require('../models');

// import sequelize from '../config/connection.js';
// import {Customers, ItemTypes, Items, Orders, OrderItems} from '../models/index.js';

const sequelize = require('../config/connection');
const {Customers, ItemTypes, Items, Orders, OrderItems} = require('../models');


const customersSeedData = require('./customersSeedData.json');
const itemsSeedData = require('./itemsSeedData.json');
const itemtypesSeedData = require('./itemtypesSeedData.json');
const ordersSeedData = require('./ordersSeedData.json');
const orderitemsSeedData = require('./orderitemsSeedData.json');


//! JS does not allow json file imports but, can use 'assert' statement to allow
// import customersSeedData from './customersSeedData.json'assert { type: 'json'};
// import itemtypesSeedData from './itemtypesSeedData.json' assert { type: 'json'};
// import itemsSeedData from './itemsSeedData.json' assert { type: 'json'};
// import ordersSeedData from './ordersSeedData.json' assert { type: 'json'};
// import orderitemsSeedData from './orderitemsSeedData.json' assert { type: 'json'};

// const addData=(data) => {
//   data = data.map(item => {
//     item.date_added = Date.now()
//     item.added_by = 'alexis'
//     return item
//   })
//   return data
// }
//if any changes to schema, delete database and recreate schema and reload data.
//This allows us to restart at any point.  In other words, the seed.js file is
//actually doing the schema and the data seeding.
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // loop throught the seed data
  // add the required fields
  // then return data to 'bulkCreate'
  //remove adddata in each line since we're not using it anymore
  await Customers.bulkCreate(customersSeedData);
  await ItemTypes.bulkCreate(itemtypesSeedData); //(addData(itemtypesSeedData));
  await Items.bulkCreate(itemsSeedData); //(addData(itemsSeedData));
  await Orders.bulkCreate(ordersSeedData); //(addData(ordersSeedData));
  await OrderItems.bulkCreate(orderitemsSeedData); //(addData(orderitemsSeedData));
  process.exit(0);
};

seedDatabase();
