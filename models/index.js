// const Traveller = require('./Traveller');
// const Location = require('./Location');
// const Trip = require('./Trip');
//simpllfies developer experience for other developers who need to use this data
//connects all the table js files with associations

// import ItemTypes from './ItemTypes.js';
// import Customers from './Customers.js';
// import Items from './Items.js';
// import Orders from './Orders.js';
// import OrderItems from './OrderItems.js';

const ItemTypes = require('./ItemTypes.js');
const Customers = require('./Customers.js');
const Items = require('./Items.js');
const Orders = require('./Orders.js');
const OrderItems = require('./OrderItems.js');

// Define a restaurant as having many customers, thus creating a foreign key in the customers table
ItemTypes.hasMany(Items, {
  foreignKey: 'item_type_id',
  onDelete: 'CASCADE',
});

Customers.hasMany(Orders, {
  foreignKey: 'customer_id',
  onDelete: 'CASCADE',
});

Items.hasMany(OrderItems, {
  foreignKey: 'item_id',
  onDelete: 'CASCADE',
});

Orders.hasMany(OrderItems, {
  foreignKey: 'order_id',
  onDelete: 'CASCADE',
});

/**
 * A list of associations to eagerly load using a left join (a single association is also supported).
 *  Supported is either { include: Model1 }, { include: [ Model1, Model2, ...]}, 
 * { include: [{ model: Model1, as: 'Alias' }]} or { include: [{ all: true }]}. 
 * If your association are set up with an as (eg. X.hasMany(Y, { as: 'Z' }, you need to specify 
 * Z in the as attribute when eager loading Y).
 */

module.exports = {ItemTypes, Customers, Items, Orders, OrderItems};
// export {
//   ItemTypes,
//   Customers,
//   Items,
//   Orders,
//   OrderItems
// }
