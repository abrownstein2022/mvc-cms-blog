const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//import { Model, DataTypes } from 'sequelize';
//import sequelize from '../config/connection.js';

/**
 * create our Orders model
*/
class Orders extends Model {}  

// create fields/columns for Restaurants model
Orders.init(
  {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'customers',
        key: 'customer_id',
        unique: false
      }
    }, 
    order_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW  //built-in function/method
    },
    order_notes: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, 
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'orders'   //lowercase for modelname only
  }
);

module.exports = Orders;
//export default Orders;
